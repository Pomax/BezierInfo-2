#!/usr/local/bin/perl

# $Id: tex2utf.pl, v 1.0 2020/10/16 16:09:00 Pomax $
#
# UTF8-massaged version of https://ctan.org/pkg/tex2mail
#
# Updated October 2020 by pomax@nihongoressources.com,
# original header immediately follows this comment block,
# with spacing updated to something that looks uniform. 

# $Id: tex2mail.in,v 1.1 2000/10/27 19:13:53 karim Exp $
#
# Features:
#      % at the end of a line followed by \n\n is recognized as end of
#      paragraph :-(
#
# Change log is at bottom.
#
# Options:
#  linelength=75 # Cut at this line
#  maxdef=400    # definition loops: croak if many substitutions
#  debug=0
#  by_par=0      # Expect each paragraph to be terminated
#                # by *exactly* 2 "\n", and do not print
#                # an extra "\n" between paragraphs
#  TeX           # Assume it is not LaTeX
#  ragged        # leave right ragged
#  noindent      # assume \noindent everywhere

use Getopt::Long;

$linelength = 150;
$maxdef = 400;
$debug = false;
$opt_by_par = false;
$opt_TeX = true;
$opt_ragged = false;
$opt_noindent = false;

GetOptions(
  "linelength=s" => \$linelength,
  "maxdef=s" => \$maxdef,
  "debug" => \$debug,
  "by_par" => \$opt_by_par,
  "TeX" => \$opt_TeX,
  "ragged" => \$opt_ragged,
  "noindent" => \$opt_noindent
) or die "Could not parse provided runtime flag(s)";

#
# This part is a little different: enable utf8 and ensure that
# even on Windows, the input/output is fully unicode conformant:
#

use utf8;

use open ':std', ':encoding(UTF-8)';
BEGIN {
  if ($^O eq "MSWin32") {
    require Win32::Unicode::File;
    Win32::Unicode::File->import();
  }
}

#
# The original code then continues here...
#

$notusualtoks="\\\\" . '\${}^_~&@';
$notusualtokenclass="[$notusualtoks]";
$usualtokenclass="[^$notusualtoks]";
$macro='\\\\([^a-zA-Z]|([a-zA-Z]+\s*))'; # Why \\\\? double interpretation!
$active="$macro|\\\$\\\$|$notusualtokenclass";
$tokenpattern="$usualtokenclass|$active";
$multitokenpattern="$usualtokenclass+|$active";

# Format of the record: height,length,baseline,expandable-spaces,string
# The string is not terminated by \n, but separated into rows by \n.
# height=0 denotes expandable string
# Baseline=3 means the 4th row is the baseline

sub debug_print_record {
  local($h,$l,$b,$xs,$s) = split /,/, shift, 5;
  local(@arr) = split /\n/, $s;
  print STDERR "len=$l, h=$h, b=$b, exp_sp=$xs.\n";
  local($i) = 0;
  for (@arr) {
    local($lead) = ($i++ == $b) ? 'b [' : '  [';
    print STDERR "$lead$_]\n";
  }
  while ($i < $h) {		# Empty lines may skipped
    local($lead) = ($i++ == $b) ? 'b' : '';
    print STDERR "$lead\n";
  }
}

# Takes length and a record, returns 2 records

sub cut {
  local($length)=(shift);
  local($h,$l,$b,$sp,$str)=split(/,/,shift,5);
  local($st1,$st2)=("","");
  local($sp1,$sp2,$first,$l2)=(0,0,1,$l-$length);
  return (shift,&empty) if $l2<0;
  if ($h) {
    for (split(/\n/,$str,$h)) {
      if (!$first) {
        $st1 .= "\n";
        $st2 .= "\n";
      } else {$first=0;}
      $st1 .= substr($_,0,$length);
      $st2 .= substr($_,$length);
    }
  } else {
    $st1 = substr($str,0,$length);
    $st2 = substr($str,$length);
    #if ($sp && ($st1 =~ /(\S)(\s+\S*)$/)) {
    # $st2 = $2 . $st2;
    # $st1 = $` . $1;
    # $sp1 = ($st1 =~ /(\s)/g);
    # $sp2 = ($st2 =~ /(\s)/g);
    #}
  }
  return ("$h,$length,$b,$sp1,$st1","$h,$l2,$b,$sp2,$st2");
}

# Outputs a record

sub printrecord {
  warn "Printing $_[0]\n__ENDPRINT__\n" if $debug & $debug_record;
  local($h,$l,$b,$sp,$str)=split(/,/,shift,5);
  print $str,"\n";
}

# Joins two records

sub join {
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,shift,5);
  local($h2,$l2,$b2,$sp2,$str2)=split(/,/,shift,5);
  $h1 || $h1++;
  $h2 || $h2++;
  local($h,$l,$b,$sp,$str,@str,@str2)=(0,0,0,$sp1+$sp2,"");
  $b = $b1 > $b2 ? $b1 : $b2;
  # Calculate space below baseline
  $h = $h1-$b1 > $h2-$b2 ? $h1-$b1 : $h2-$b2;
  # And height
  $h += $b;
  $l=$l1+$l2;
  @str="" x $h;
  @str[$b-$b1 .. $b-$b1+$h1-1]=split(/\n/,$str1,$h1);
  @str2[0..$h2-1]=split(/\n/,$str2,$h2);
  unless (length($str2[$b2])) {
    $str2[$b2] = ' ' x $l2;	# Needed for length=0 "color" strings
                                # in the baseline.
  }
  if ($debug & $debug_record && (grep(/\n/,@str) || grep(/\n/,@str2))) {
    warn "\\n found in \@str or \@str2";
    warn "`$str1', need $h1 rows\n";
    warn "`$str2', need $h2 rows\n";
  }
  # This is may be wrong if a zero-length record with escape sequences
  # is appended to with something not on the same row...  But
  # apparently, it should be OK for PARI...
  for (0..$h2-1) {
    $str[$b-$b2+$_] .= " " x ($l1 - length ($str[$b-$b2+$_])) . $str2[$_];
  }
  return "$h,$l,$b,$sp," . join("\n",@str);
}

# The current line is contained in the array @out of records and, possibly,
# one additional record $last. If $last exists, $islast is set to 1.
# The output channel length is contained in $linelength, the accumulated
# length of @out and $last is contained in $curlength.
# We guaranty that if $curlength>$linelength, then @out is empty.

# Gets a length of a record

sub length {
  (warn "Wrong format of a record `$_[0]'", return 0)
      unless $_[0] =~ /^\d+,(\d+)/;
  $1;
}

# Gets a height of a record

sub height {
  (warn "Wrong format of a record `$_[0]'", return 0)
      unless $_[0] =~ /^(\d+),/;
  $1;
}

# Sets baseline of a record, Usage s...(rec,base)

sub setbaseline {
  (warn("Wrong format of a record `$_[0]'"), return undef)
      unless $_[0] =~ s/^(\d+,\d+,)(\d+)/\1$_[1]/;
}

# The hierarchical structure: the records to work are in the array @out.
# The array @chunks keeps the beginning record of the chunks,
# The array @level keeps the beginning chunks of the given level.
# The last chunk can begin after the last record if this chunk is still empty.

# We do not keep the inner structure of the chunk unless it is the last
# chunk on the given level.

# Each record is a rectangle to output to the "page".

# Each chunk is a sequence of records which reflect one finished subgroup
# on the given level.

# Each level is a sequence of chunks which correspond to a
# not-yet-finished group in TeX input.


# The parallel to @level array @wait
# contains an event we wait to complete the given level of array.

# Chunks on a given level

# Used to expand spaces

sub exp_sp {$c1++;$c2=0 if $c1>$re; return " " x ($c2+$fr+1);}

# Outputs the outermost level of the output list (until the start of level 1)
# If gets a true argument, does not expand spaces

sub print {
  warn "Printing...\n" if $debug & $debug_flow;
  local($last,$l,$exp) = ($#level? $chunks[$level[1]]-1: $#out);
  ($last >=0) || return;
  $l=&length($out[0]);
  if ($last >= 1) {
    for (1..$last) {
      $l += &length($out[$_]);
    }
  }
  if ($debug & $debug_length)  {
    if ($l != $curlength) {
      for (0..$last) {
        warn "Wrong lengths Record $_ $out[$_]\n__ENDREC__\n" ;
      }
    }
  }
  $curlength=$l;
  warn "l=$l, linelength=$linelength, curlength=$curlength\n"
    if $debug & $debug_length;
 IF_L:
 {
  if (!shift && ($l=$linelength-$curlength)>=0) {
    warn "entered branch for long string\n"
      if $debug & $debug_length;
    $exp=0;
    (($out[$last] =~ s/\s+$//) && ($l+=length($&)))
        if $out[$last] =~ /^0,/;
    warn "l=$l with whitespace\n"
      if $debug & $debug_length;
    last IF_L if $l<=0;
    local($str,$h,$fr,$re,$c1,$c2,@t);
    for (0..$last) {
      ($str,$h)=(split(/,/,$out[$_],5))[4,0];
      (@t = ($str =~ /( )/g), $exp+=@t) if (!$h);
    }
    if ($exp) {
      $re=$l % $exp;
      $fr=int(($l-$re)/$exp);
      warn "$l Extra spaces in $exp places, Fr=$fr," .
          " Remainder=$re, LL=$linelength, CL=$curlength\n" if $debug & $debug_length;
      $c1=0;
      $c2=1;
      for (0..$last) {
        ($str,$h)=(split(/,/,$out[$_],5))[4,0];
        unless ($h || $opt_ragged) {
          $str =~ s/ /&exp_sp/ge;
          $out[$_]=&string2record($str);
        }
      }
    }
  }
  else {warn "Do not want to expand $l spaces\n" if $debug & $debug_length;}
 }
  if ($last >= 1) {
    for (1..$last) {
      $out[0] = &join($out[0],$out[$_]);
    }
  }
  $l=&length($out[0]);
  warn "LL=$linelength, CurL=$curlength, OutL=$l\n" if $debug & $debug_length;
  &printrecord($out[0]);
  $curlength=0;
  if ($#out>$last) {
    @out=@out[$last+1..$#out];
    for (0..$#chunks) {$chunks[$_] -= $last+1;}
  } else {
    @out=();
  }
  if ($#level) {
    splice(@chunks,1,$level[1]-2);
  } else {
    @chunks=(0);
  }
}

# Cuts prepared piece and arg into printable parts (unfinished)
# Suppose that level==0

sub prepare_cut {
  warn "Preparing to cut $_[0]\n" if $debug & $debug_flow;
  warn "B:Last chunk number $#chunks, last record $#out\n" if $debug & $debug_flow;
  (warn "\$#level non 0", return $_[0]) if ($#level!=0);
  local($lenadd)=(&length($_[0]));
  local($lenrem)=($linelength-$curlength);
  if ($lenadd+$curlength<=$linelength) {
    warn "No need to cut, extra=$lenrem\n" if $debug & $debug_flow;
    return $_[0];
  }
  # Try to find a cut in the added record before $lenrem
  local($rec)=@_;
  local($h,$str,$ind,@p)=(split(/,/,$rec,5))[0,4];
  local($good)=(0);
  if ($h<2) {
    while ($lenrem<$lenadd && ($ind=rindex($str," ",$lenrem))>-1) {
      warn "Cut found at $ind, lenrem=$lenrem\n" if $debug & $debug_flow;
      $good=1;
      # $ind=1 means we can cut 2 chars
      @p= &cut($ind+1,$rec);
      warn "After cut: @p\n" if $debug & $debug_record;
      push(@out,$p[0]);
      $curlength+=$ind+1;
      #if ($#out!=$chunks[$#chunks]) {push(@chunks,$#out);}
      &print();
      $rec=$p[1];
      ($lenadd,$str)=(split(/,/,$rec,5))[1,4];
      $lenrem=$linelength;
    }
    return $rec if $good;
  }
  # If the added record is too long, there is no sense in cutting
  # things we have already, since we will cut the added record anyway...
  local($forcedcut);
  if ($lenadd > $linelength && $lenrem) {
      @p= &cut($lenrem,$rec);
      warn "After forced cut: @p\n" if $debug & $debug_record;
      push(@out,$p[0]);
      $curlength+=$lenrem;
      &print();
      $rec=$p[1];
      ($lenadd,$str)=(split(/,/,$rec,5))[1,4];
      $lenrem=$linelength;
  }
  # Now try to find a cut before the added record
  if ($#out>=0 && !$forcedcut) {
    for (0..$#out) {
      ($h,$str)=(split(/,/,$out[$#out-$_],5))[0,4];
      if ($h<2 && ($ind=rindex($str," "))>-1 && ($ind>0 || $_<$#out)) {
        warn "Cut found at $ind, in chunk $#out-$_\n"
            if $debug & $debug_flow;
        # split at given position
        @p=&cut($ind+1,$out[$#out-$_]);
        $out[$#out-$_]=$p[0];
        @p=($p[1],@out[$#out-$_+1..$#out]);
        @out=@out[0..$#out-$_];
warn "\@p is !", join('!', @p), "!\n\@out is !", join('!', @out), "!\n"
            if $debug & $debug_flow;
        &print();
	warn "did reach that\n"
	  if $debug & $debug_length;
        @out=@p;
        $good=1;
        $curlength=0;
        for (@out) {$curlength+=&length($_);}
        last;
      }
      warn "did reach wow-this\n"
	if $debug & $debug_length;
    }
    warn "did reach this\n"
      if $debug & $debug_length;
  }
  return &prepare_cut if $good;
  warn "No cut found!\n" if $debug & $debug_flow;
  # If anything else fails use force
  &print();
  while (&length($rec)>$linelength) {
    @p=&cut($linelength,$rec);
    @out=($p[0]);
    &print();
    $rec=$p[1];
  }
  $curlength=0;
  return $rec;
}

# Adds a record to the output list

sub commit {
  warn "Adding $_[0]\n" if $debug & $debug_flow;
  warn "B:Last chunk number $#chunks, last record $#out\n" if $debug & $debug_flow;
  local($rec)=@_;
  if ($#level==0) {
    local($len)=&length($_[0]);
    if ($curlength+$len>$linelength) {
      $rec=&prepare_cut;
      $len=&length($rec);
    }
    $curlength+=$len;
  }
  push(@out,$rec);
  if ($#out!=$chunks[$#chunks]) {push(@chunks,$#out);}
  warn "a:Last chunk number $#chunks, last record $#out, the first chunk\n" if $debug & $debug_flow;
  warn " on the last level=$#level is $level[$#level], waiting for $wait[$#level]\n" if $debug & $debug_flow;
  if ($#level && $wait[$#level] == $#chunks-$level[$#level]+1) {
    local($sub,$arg)=($action[$#level]);
    if ($sub eq "") {&finish($wait[$#level]);}
    else {
      &callsub($sub);
    }
  }
  warn "curlength=$curlength on level=$#level\n" if $debug & $debug_length;
}

# Calls a subroutine, possibly with arguments

sub callsub {
  local($sub)=(shift);
  index($sub,";")>=0?
    (($sub,$arg)=split(";",$sub,2), &$sub($arg)):
      &$sub;
}

# Simulates Removing a record from the output list (unfinished)

sub uncommit {
  warn "Deleting...\n" if $debug & $debug_flow;
  warn "B:Last chunk number $#chunks, last record $#out\n" if $debug & $debug_flow;
  (warn "Nothing to uncommit", return) if $#out<0;
  if ($#level==0) {
    local($len)=&length($out[$#out]);
    $curlength-=$len;
  }
  local($rec);
  $rec=$out[$#out];
  $out[$#out]=&empty();
  warn "UnCommit: now $chunks[$#chunks] $rec\n__ENDREC__\n"
      if $debug & $debug_record;
  #if ($#out<$chunks[$#chunks]) {pop(@chunks);}
  warn "a:Last chunk number $#chunks, last record $#out, the first chunk\n" if $debug & $debug_flow;
  warn " on the last level=$#level is $level[$#level], waiting for $wait[$#level]" if $debug & $debug_flow;
  warn "curlength=$curlength on level=$#level\n" if $debug & $debug_length;
  return $rec;
}

# finish($event, $force_one_group)

# Finish the inner scope with the event $event. If this scope is empty,
# add an empty record.  If finishing the group would bring us to toplevel
# and $force_one_group is not set, can break things into chunks to improve
# line-breaking.

# No additional action is executed

sub finish {
  warn "Finishing with $_[0]\n" if $debug & $debug_flow;
  local($event,$len,$rec)=(shift);
  if (($wait[$#level] ne "") && ($wait[$#level] ne $event)) {
    warn "Got `$event' while waiting for `$wait[$#wait]', rest=$par";
  }
  warn "Got finishing event `$event' in the outermost block, rest=$par"
      unless $#level;
  if ($#out<$chunks[$level[$#level]]) {push(@out,&empty);}
  # Make anything after $level[$#level] one chunk if there is anything
  warn "B:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  $#chunks=$level[$#level]; #if $chunks[$level[$#level]]<=$#out;
  local(@t);
  if ($#level==1 && !$_[0]) {
    @t=@out[$chunks[$#chunks]..$#out];
    $#out=$chunks[$#chunks]-1;
  }
  #  $#chunks-- if $chunks[$#chunks-1]==$chunks[$#chunks];
  $#level--;
  $#action--;
  $#tokenByToken--;
  $#wait--;
  if ($#level==0 && !$_[0]) {
    for (@t) {&commit($_);}
  }
  warn
      "a:Last $#chunks, the first on the last level=$#level is $level[$#level]"
           if $debug & $debug_flow;
  if ($wait[$#level] == $#chunks-$level[$#level]+1) {
    local($sub)=($action[$#level]);
    if ($sub eq "") {&finish($wait[$#level]);}
    else {&callsub($sub);}
  }
}

# finish level and discard it

sub finish_ignore {
        warn "Finish_ignoring with $_[0]\n" if $debug & $debug_flow;
        local($event,$len)=(shift);
        if (($wait[$#level] ne "") && ($wait[$#level] ne $event)) {
                warn "Got `$event' while waiting for `$wait[$#wait]', rest=$par";
        }
        warn "Got finishing event `$event' in the outermost block, rest=$par" unless $#level;
  $#out=$chunks[$level[$#level]]-1;
  pop(@level);
  pop(@tokenByToken);
  pop(@action);
  pop(@wait);
}

# Begin a new level with waiting for $event

# Special events: If number, wait this number of chunks

sub start {
  warn "Beginning with $_[0], $_[1]\n" if $debug & $debug_flow;
  warn "B:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  if ($chunks[$level[$#level]] <= $#out && $chunks[$#chunks] <= $#out) {
    # the last level is non empty
    push(@chunks, $#out + 1);
  }
  push(@level, $#chunks);
  push(@tokenByToken, 0);
  $wait[$#level] = shift;
  if ($#_<0) { $action[$#level] = ""; } else { $action[$#level] = shift; }
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
}

# Asserts that the given number of chunks exists in the last level

sub assertHave {
  local($i,$ii)=(shift);
  if (($ii=$#chunks-$level[$#level]+1)<$i) {
    warn "Too few chunks ($ii) in inner level, expecting $i";
    return 0;
  }
  return 1;
}

# Takes the last ARGUMENT chunks, collapse them to records

sub collapse {
  warn "Collapsing $_[0]...\n" if $debug & $debug_flow;
  local($i,$ii,$_)=(shift);
  if (($ii=$#chunks-$level[$#level]+1)<$i) {
    warn "Too few chunks ($ii) in inner level, expecting $i";
    $i=$ii;
  }
  if ($i>0) {
    for (0..$i-1) {
      &collapseOne($#chunks-$_);
    }
    for (1..$i-1) {
      $chunks[$#chunks-$_+1]=$chunks[$#chunks-$i+1]+$i-$_;
    }
  }
}

# Collapses all the chunks on given level

sub collapseAll {&collapse($#chunks-$level[$#level]+1);}

# Collapses a given chunk in the array @out. No correction of @chunks is
# performed

sub collapseOne {
  local($n)=(shift);
  local($out,$last,$_)=($out[$chunks[$n]]);
  if ($n==$#chunks) {$last=$#out;} else {$last=$chunks[$n+1]-1;}
        warn "Collapsing_one $n, records $chunks[$n]..$last\n"
                if $debug & $debug_flow;
  return unless $last>$chunks[$n];
  warn "Collapsing chunk $n beginning at $chunks[$n], ending at $last\n" if $debug & $debug_flow;
  for ($chunks[$n]+1..$last) {
    $out=&join($out,$out[$_]);
  }
  splice(@out,$chunks[$n],$last+1-$chunks[$n],$out);
  # $#out-=$last-$chunks[$n]; #bug in perl?
  warn "Collapsed $chunks[$n]: $out[$chunks[$n]]\n__END__\n" if $debug & $debug_record;
}

# Return an empty record

sub empty {
  return "0,0,0,0,";
}

# Commits a record with a sum symbol
sub sum {
  &commit("3,2,1,0," . <<'EOF');
__
❯ 
‾‾
EOF
}

# Additional argument specifies if to make not-expandable, not-trimmable

sub string2record {
  local($h,$sp)=(0);
  if ($_[1]) {$h=1;$sp=0;}
  else {
    $sp=($_[0] =~ /(\s)/g);
    $sp || ($sp=0); # Sometimes it is undef?
  }
  return "$h," . length($_[0]) . ",0,$sp,$_[0]";
}

# The second argument forces the block length no matter what is the
# length the string (for strings with screen escapes).

sub record_forcelength {
  $_[0] =~ s/^(\d+),(\d+)/$1,$_[1]/;
}

sub finishBuffer {
  while ($#level > 0) {
    &finish("");
  }
  &print(1);
}

# Takes two records, returns a record that concatenates them vertically
# To make fraction simpler, baseline is the last line of the first record

sub vStack {
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,shift,5);
  local($h2,$l2,$b2,$sp2,$str2)=split(/,/,shift,5);
  $h1 || $h1++;
  $h2 || $h2++;
  local($h,$l,$b)=($h1+$h2, ($l1>$l2 ? $l1: $l2), $h1-1);
  warn "\$h1=$h1, \$h2=$h2, Vstacked: $h,$l,$b,0,$str1\n$str2\n__END__\n" if $debug & $debug_record;
  return "$h,$l,$b,0,$str1\n$str2";
}

# Takes two records, returns a record that contains them and forms
# SupSub block

sub superSub {
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,shift,5);
  local($h2,$l2,$b2,$sp2,$str2)=split(/,/,shift,5);
  $h1 || $h1++;
  $h2 || $h2++;
  local($h,$l)=($h1+$h2+1, ($l1>$l2 ? $l1: $l2));
  return "$h,$l,$h1,0,$str1\n\n$str2";
}

# Takes two records, returns a record that contains them and forms
# SupSub block

sub subSuper {
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,shift,5);
  local($h2,$l2,$b2,$sp2,$str2)=split(/,/,shift,5);
  $h1 || $h1++;
  $h2 || $h2++;
  local($h,$l)=($h1+$h2+1, ($l1>$l2 ? $l1: $l2));
  return "$h,$l,$h1,0,$str2\n\n$str1";
}

# Takes the last two records, returns a record that contains them and forms
# SupSub block

sub f_subSuper {
  warn "Entering f_subSuper...\n" if $debug & $debug_flow;
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  &sup_sub(0,1);
}

sub sup_sub {
  local($p1,$p2)=($#out-shift,$#out-shift);
  warn "Super $p1 $out[$p1]\nSub $p2 $out[$p2]\n__END__\n" if $debug & $debug_record;
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,$out[$p1],5);
  local($h2,$l2,$b2,$sp2,$str2)=split(/,/,$out[$p2],5);
  if ($l1==0 && $l2==0) {return;}
  $h1 || $h1++;
  $h2 || $h2++;
  local($h,$l)=($h1+$h2+1, ($l1>$l2 ? $l1: $l2));
  $#chunks--;
  $#out--;
  if ($l1==0) {
    $h2++;
    $out[$#out]="$h2,$l,0,0,\n$str2";
  } elsif ($l2==0) {
    $h=$h1+1;
    $out[$#out]="$h,$l,$h1,0,$str1\n";
  } else {
    $out[$#out]="$h,$l,$h1,0,$str1\n\n$str2";
  }
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(2,1);
}

# Takes the last two records, returns a record that contains them and forms
# SupSub block

sub f_superSub {
  warn "Entering f_superSub...\n" if $debug & $debug_flow;
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  &sup_sub(1,0);
}

# digest \begin{...} and similar: handles argument to a subroutine
# given as argument

sub f_get1 {
  warn "Entering f_get1...\n" if $debug & $debug_flow;
  (warn "Argument of f_get1 consists of 2 or more chunks", return)
      if $#out != $chunks[$#chunks];
  local($rec,$sub);
  #$rec=&uncommit;
  $rec=$out[$#out];
  $rec=~s/.*,//;
  $sub=shift;
  defined $sub ? return &$sub($rec): return $rec;
}

sub f_begin {
  warn "Entering f_begin...\n" if $debug & $debug_flow;
  &collapse(1);
  &assertHave(1) || &finish("");
  local($arg,$env)=(&f_get1());
  &finish_ignore(1);
  $arg=~s/^\s+//;
  $arg=~s/\s+$//;
  return if defined $environment_none{$arg};
  if (defined ($env=$environment{$arg})) {
    local($b,$e)=split(/,/,$env);
    for (split(":",$b)) {&callsub($_);}
  } else {&puts("\\begin{$arg}");}
}

sub f_end {
  warn "Entering f_end...\n" if $debug & $debug_flow;
  &collapse(1);
  &assertHave(1) || &finish("");
  local($arg,$env)=(&f_get1());
  &finish_ignore(1);
  $arg=~s/^\s+//;
  $arg=~s/\s+$//;
  return if defined $environment_none{$arg};
  if (defined ($env=$environment{$arg})) {
    local($b,$e)=split(/,/,$env,2);
    for (split(":",$e)) {&callsub($_);}
  } else {&puts("\\end{$arg}");}
}


sub f_literal_no_length {
  warn "Entering f_literal_with_length...\n" if $debug & $debug_flow;
  # &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  record_forcelength($out[$#out], 0);
  &finish(1,1);
}

sub f_discard {
  warn "Entering f_discard...\n" if $debug & $debug_flow;
  &finish_ignore($wait[$#level]);
}

# Takes a number and a record, returns a centered record

sub center {
  local($len,$left)=(shift,0);
        warn "Entering center, ll=$len, rec=$_[0]\n__ENDREC__\n" if $debug & $debug_flow;
  #$_[0]; # bug in perl?
  local($h1,$l1,$b1,$sp1,$str1)=split(/,/,$_[0],5);
  $h1 || $h1++;
  if (($left=$len-$l1)<=0) {return $_[0];}
  $left=int($left/2);
  local($out,$first)=("",1);
  for (split(/\n/,$str1,$h1)) {
    if ($first) {$first=0;}
    else {$out .= "\n";}
    $out .= " " x $left . $_;
  }
  return "$h1,$len,$b1,0,$out";
}

# Example of radical
#<<'EOF';
# +--+
#\|12
#EOF
<<EOF;				# To hide HERE-DOC start above  from old CPerl
EOF

# Takes the last record, returns a record that contains it and forms
# radical block

sub f_radical {
  warn "Entering f_radical...\n" if $debug & $debug_flow;
  &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Radical of $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h,$l,$b)=($out[$#out] =~ /^(\d+),(\d+),(\d+)/g);
  $h || $h++;
  local($out,$b1,$h1);
  $out=&vStack(&string2record(("─" x $l)."┐" ),$out[$#out]);
  $b1=$b+1;
  $h1=$h+1;
  #$out =~ s/^(\d+,\d+,)(\d+)/\1$b1/;
  &setbaseline($out,$b1);
  $out[$#out]=&join("$h1,2,$b1,0, ┌\n" . (" │\n" x ($h-1)) . '⟍│',$out);
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1);
}

# Takes the last two records, returns a record that contains them and forms
# fraction block

sub f_fraction {
  warn "Entering f_fraction...\n" if $debug & $debug_flow;
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  warn "Numer `$out[$#out-1]'\nDenom `$out[$#out]'\n__END__\n" if $debug & $debug_record;
  local($l1,$l2)=(&length($out[$#out-1]),&length($out[$#out]));
  local($len)=(($l1>$l2 ? $l1: $l2));
  $out[$#out-1]=&vStack(&vStack(&center($len,$out[$#out-1]),
                         &string2record("─" x $len)),
                 &center($len,$out[$#out]));
  $#chunks--;
  $#out--;
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(2,1);
}

sub f_choose {
  warn "Entering f_choose...\n" if $debug & $debug_flow;
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  warn "Numer `$out[$#out-1]'\nDenom `$out[$#out]'\n__END__\n" if $debug & $debug_record;
  local($l1,$l2)=(&length($out[$#out-1]),&length($out[$#out]));
  local($len)=(($l1>$l2 ? $l1: $l2));
  $out[$#out]=&vStack(&vStack(&center($len,$out[$#out-1]),
                         &string2record(" " x $len)),
                 &center($len,$out[$#out]));
  $#chunks++;
  $#out++;
  #warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  $out[$#out - 2] = &string2record("(");
  $out[$#out] = &string2record(")");
  local($h,$b)=($out[$#out-1] =~ /^(\d+),\d+,(\d+)/)[0,1];
  &makehigh($out[$#out-2],$h,$b,0,1);
  &makehigh($out[$#out],$h,$b,1,0);
  &finish(2,1);
}


sub f_buildrel {
        warn "Entering f_buildrel...\n" if $debug & $debug_flow;
  &trim(3);
        &collapse(3);
        &assertHave(3) || &finish("",1);
        warn "What: $out[$#out-2]\nOver $out[$#out]\n__END__\n" if $debug & $debug_record;
        local($rec)=($out[$#out-2]);
        $out[$#out-2]=$out[$#out];
        $#chunks-=2;
        $#out-=2;
  &f_putover($rec,1);
        warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
        &finish(3,1);
}

# Takes two records, returns a record that contains them and forms a
# fraction block

sub fraction {
  local($l1,$l2)=(&length($_[0]),&length($_[1]));
  local($len)=(($l1>$l2 ? $l1: $l2));
  return &vStack(&vStack(&center($len,shift),
                         &string2record("-" x $len)),
                 &center($len,shift));
}

# Commits a given string

sub puts {
  &commit(&string2record);
}

# ===========================================
#
#   Main script entry point: this function
#  runs over and over until there is nothing
#         left for it to process.
#
# ===========================================
sub paragraph {
  local($par);
  $par=<>;
  return 0 unless defined $par;
  return 1 unless $par =~ /\S/;			# whitespace only
  print "\n" if $secondtime++ && !$opt_by_par;
  #$par =~ s/(^|[^\\])%.*\n[ \t]*/\1/g;
  $par =~ s/((^|[^\\])(\\\\)*)(%.*\n[ \t]*)+/\1/g;
  $par =~ s/\n\s*\n/\\par /g;
  $par =~ s/\s+/ /g;
  $par =~ s/\s+$//;
  $par =~ s/(\$\$)\s+/\1/g;
  $par =~ s/\\par\s*$//;
  local($defcount,$piece,$pure,$type,$sub,@t,$arg)=(0);
  &commit("1,5,0,0,     ")
    unless $opt_noindent || ($par =~ s/^\s*\\noindent\s*([^a-zA-Z\s]|$)/\1/);
  while ($tokenByToken[$#level] ?
      ($par =~ s/^\s*($tokenpattern)//o): ($par =~ s/^($multitokenpattern)//o)) {
    warn "tokenByToken=$tokenByToken[$#level], eaten=`$1'\n"
        if $debug & $debug_parsing;
    if (($piece=$1) =~ /^$usualtokenclass/o) {
      # plain piece
      &puts($piece);
    } else {
      # macro or delimiter
      ($pure = $piece) =~ s/\s+$//;
      if (defined ($type=$type{$pure})) {
        if ($type eq "def") {
    warn "To many def expansions in a paragraph" if $defcount++==$maxdef;
    last if $defcount>$maxdef;
    @t=(0);
    for (1..$args{$pure}) {
      push(@t,&get_balanced());
    }
    warn "Defined token `$pure' found with $args{$pure} arguments @t[1..$#t]\n"
    if $debug & $debug_parsing;
    $sub=$def{$pure};
    $sub =~ s/(^|[^\\#])#(\d)/$1 . $t[$2]/ge if $args{$pure};
    $par=$sub . $par;
        } elsif ($type eq "sub") {
	  $sub=$contents{$pure};
	  index($sub,";")>=0?
	    (($sub,$arg)=split(";",$sub,2), &$sub($pure,$arg)):
	      &$sub($pure);
        } elsif ($type =~ /^sub(\d+)$/) {
          &start($1,"f_$contents{$pure}");
          $tokenByToken[$#level]=1;
        } elsif ($type =~ /^get(\d+)$/) {
          &start($1+1);
          &puts($piece);
          $tokenByToken[$#level]=1;
        } elsif ($type =~ /^discard(\d+)$/) {
          &start($1,"f_discard");
          $tokenByToken[$#level]=1;
        } elsif ($type eq "record") {
          &commit($contents{$pure});
        } elsif ($type eq "self") {
          &puts(substr($pure,1) . ($pure =~ /^\\[a-zA-Z]/ ? " ": ""));
        } elsif ($type eq "par_self") {
	  &finishBuffer;
	  &commit("1,5,0,0,     ");
          &puts($pure . ($pure =~ /^\\[a-zA-Z]/ ? " ": ""));
        } elsif ($type eq "self_par") {
          &puts($pure . ($pure =~ /^\\[a-zA-Z]/ ? " ": ""));
	  &finishBuffer;
	  &commit("1,5,0,0,     ")
	    unless $par =~ s/^\s*\\noindent(\s+|([^a-zA-Z\s])|$)/\2/;
        } elsif ($type eq "string") {
          &puts($contents{$pure},1);
        } elsif ($type eq "nothing") {
        } else {
          warn "Error with type `$type' while interpreting `$pure'";
        }
      } else {
        &puts($piece);
      }
    }
  }
  warn "Unrecognized part of input `$par',\n\ttoken-by-token[$#level]=$tokenByToken[$#level]" if $par ne "";

  &finishBuffer if $#out >= 0;
  
  1; # return 0 if eof();
}

sub subscript {
  &start(1,"f_subscript");
  $tokenByToken[$#level]=1;
}

sub superscript {
  &start(1,"f_superscript");
  $tokenByToken[$#level]=1;
}


sub f_subscript {
  $wait[$#level]=2;
  $action[$#level]="f_subSuper";
  if (($par !~ s/^\s*\^//) &&
      ($par !~ s:^\s*\\begin\s*\{Sp\}:\\begin\{matrix\}:)) {
    &commit(&empty);
  }
}

sub f_overline {
  warn "Entering f_overline...\n" if $debug & $debug_flow;
  &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Overlining $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h,$len,$b)=($out[$#out] =~ /^(\d+),(\d+),(\d+)/);
  $out[$#out]=&vStack(&string2record("_" x $len),
                      $out[$#out]);
  $b++;
  #$out[$#out] =~ s/^(\d+,\d+,)(\d+)/\1$b/;
  &setbaseline($out[$#out],$b);
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1);
}

sub f_underline {
  warn "Entering f_underline...\n" if $debug & $debug_flow;
  &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Underlining $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h,$len,$b)=($out[$#out] =~ /^(\d+),(\d+),(\d+)/);
  $out[$#out]=&vStack($out[$#out],&string2record("_" x $len));
  #$out[$#out] =~ s/^(\d+,\d+,)(\d+)/\1$b/;
  &setbaseline($out[$#out],$b);
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1);
}

sub f_not {
  warn "Entering f_not...\n" if $debug & $debug_flow;
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Negating $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($str)=(split(/,/,$out[$#out]))[4];
  if ($str eq "=") {
    $out[$#out]=$contents{"\\neq"};
  } elsif ($str =~ /^\s*\|\s*$/) {
    $out[$#out]=$contents{"\\nmid"};
  } elsif ($out[$#out] eq $contents{"\\in"}) {
    $out[$#out]=$contents{"\\notin"};
  } else {
    $out[$#out]=&join(&string2record("\\not"),$out[$#out]);
  }
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1);
}

sub f_putunder {
  warn "Entering f_putunder...\n" if $debug & $debug_flow;
  &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Putting Under $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h,$len,$b)=($out[$#out] =~ /^(\d+),(\d+),(\d+)/);
        local($l2)=(&length($_[0]));
        local($len)=(($l1>$l2 ? $l1: $l2));
  $out[$#out]=&vStack(&center($len,$out[$#out]),&center($len,shift));
  #$out[$#out] =~ s/^(\d+,\d+,)(\d+)/\1$b/;
  &setbaseline($out[$#out],$b);
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1);
}

# if has additional true argument will not finish
# Takes record to put over

sub f_putover {
  warn "Entering f_putover...\n" if $debug & $debug_flow;
  &trim(1);
  &collapse(1);
  &assertHave(1) || &finish("",1);
  warn "Putting Over $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h,$l1,$b,$b1)=($out[$#out] =~ /^(\d+),(\d+),(\d+)/);
        local($l2)=(&length($_[0]));
        local($len)=(($l1>$l2 ? $l1: $l2));
  ($b1)=($_[0] =~ /^(\d+)/);
  $b+=$b1+1;
  $out[$#out]=&vStack(&center($len,shift),&center($len,$out[$#out]));
  #$out[$#out] =~ s/^(\d+,\d+,)(\d+)/\1$b/;
  &setbaseline($out[$#out],$b);
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(1,1) unless shift;
}

sub f_putpar {
        warn "Entering f_putpar...\n" if $debug & $debug_flow;
  &trim(1);
  local($l,$r)=split(";",shift);
        &collapse(1);
        &assertHave(1) || &finish("",1);
        warn "Putting Parentheses $out[$#out]\n__END__\n" if $debug & $debug_record;
  $out[$#out]=&join(&string2record($l),
      &join($out[$#out],&string2record($r)));
        &finish(1,1);
}

sub f_putover_string {
  &f_putover(&string2record);
}

sub f_widehat {
        &trim(1);
  &collapse(1);
        local($l)=(&length($out[$#out]));
        if ($l<=1) {&f_putover(&string2record("^"));}
        else {&f_putover(&string2record("/" . "~" x ($l-2) . "\\"));}
}

sub f_widetilde {
        &trim(1);
  &collapse(1);
  local($l,$l1)=(&length($out[$#out]));
  if ($l<=1) {&f_putover(&string2record("~"));}
        elsif ($l<=3) {&f_putover(&string2record("/\\/"));}
        else {&f_putover(&string2record("/" . "~" x ($l1=int($l/2-1)) .
     "\\" . "_" x ($l-3-$l1) . "/"));}
}

sub f_superscript {
  $wait[$#level]=2;
  $action[$#level]="f_superSub";
  if (($par !~ s/^\s*\_//) &&
      ($par !~ s:^\s*\\begin\s*\{Sb\}:\\begin\{matrix\}:)) {
    &commit(&empty);
  }
}

sub let {
        $par =~ s/^($tokenpattern)(= ?)?($tokenpattern)//o;
}

sub let_exp {
        $par =~ s/^($tokenpattern)(= ?)?($tokenpattern)//o;
  return if index($&,'@')>=0;
  local($what)=$1;
  $type{$what}='def';
  $& =~ /($tokenpattern)$/;
  $def{$what}=$1;
  $args{$what}=0;
        warn "Definition of `$what' with $args{$what} args is `$def{$what}'\n"
                        if $debug & $debug_parsing;
}


sub def {
  $par =~ s/^[^{]*//;
  &start(1,"f_discard");
  $tokenByToken[$#level]=1;
}

sub def_exp {
  return unless $par =~ s:^(([^\\{]|\\.)*)\{:\{:;
  local($arg)=($1);
  local($def,$act)=(&get_balanced());
  return unless defined $def;
  return if index("$arg$def",'@')>=0;
  return if $def =~ /\\([egx]?def|fi)([^a-zA-Z]|$)/;
  $def .= " "  if $def =~ /($macro)$/o;
  &define($arg,$def);
}

# Arguments: Token . Parameters, Expansion

sub define {
  local($arg,$def,$act)=(shift,shift);
  return unless $arg =~ /^($active)/o;
  $act=$1;
  $args{$act}=$';
  return unless $args{$act} =~ /^(#\d)*$/;
  $args{$act}=length($args{$act})/2;
  $def{$act}=$def;
  $type{$act}='def';
  warn "Definition of `$act' with $args{$act} args is `$def'\n"
      if $debug & $debug_parsing;
}

sub defb {
  for (@_) {
    &define("\\$_","\\begin{$_}");&define("\\end$_","\\end{$_}");
  }
}

# Discards surrounding {}

sub get_balanced {
        return undef unless $par =~ s/^($tokenpattern)//;
  return $1 unless $1 eq '{';
        local($def,$lev)=('',1);
        while ($lev) {
                last unless $par =~ s/^[^\\{}]|\\.|[{}]//;
                $lev++ if $& eq '{';
                $lev-- if $& eq '}';
                $def .= $& if $lev;
        }
        (warn "Balanced text not finished!",return undef) if $lev;
        return $def;
}


sub open_curly {
  #&puts("{") unless $tokenByToken[$#level];
  &start("}");
}

# Deletes extra spaces at the end of a record

sub trim_end {
  local($h,$str)=(split(/,/,$_[0],5))[0,4];
  if (!$h) {
    $str =~ s/\s+$//;
    $_[0]=&string2record($str);
    warn "Trimmed End `$_[0]'\n__END__\n" if $debug & $debug_record;
  }
}

# Deletes extra spaces at the beginning of a record

sub trim_beg {
  local($h,$str)=(split(/,/,$_[0],5))[0,4];
  if (!$h) {
    $str =~ s/^\s+//;
    $_[0]=&string2record($str);
    warn "Trimmed Beg `$_[0]'\n__END__\n" if $debug & $debug_record;
  }
}

# Deletes extra spaces at the ends of a chunk with given number

sub trim_one {
  &trim_beg($out[$chunks[$_[0]]]);
  &trim_end($_[0]==$#chunks? $out[$#out]: $out[$chunks[$_[0]+1]-1]);
}

# Deletes extra spaces at the ends of a given number of chunks

sub trim {
  for ($#chunks-$_[0]+1..$#chunks) {&trim_one($_);}
}

# ==========================
# Start of inline mode maths
# ==========================
sub dollar {
  if ($wait[$#level] eq '$') {        # ';
    &trim_end($out[$#out]);
    &finish('$');
  }
  else {
    &start('$');
    $par =~ s/^\s+//;
  }
}

# ==========================
# Start of block mode maths
# ==========================
sub ddollar {
  if ($wait[$#level] eq '$$') {
    &trim_end($out[$#out]);
    &finish('$$');
    return unless $#out>=0;
    $#chunks=0;
    $chunks[0]=0;
    &trim(1);
    &collapse(1);
    &printrecord(&center($linelength,$out[0]));
    @level=(0);
    @chunks=(0);
    @tokenByToken=(0);
    @out=();
    $curlength=0;
    # Maybe after \begin{align}
  }
  else {
    &finishBuffer;
    &start('$$');
  }
  $par =~ s/^\s+//;
}

sub item {
  &finishBuffer;
  # To make unexpandable:
  &commit("1,11,0,0,     (\@)   ");
}

sub bbackslash {
  if ($wait[$#level] eq '$$') {
    &ddollar();
    &ddollar();
  } elsif ($wait[$#level] eq 'endCell') {
    return if $par =~ /^\s*\\end/;		# Ignore the last one
    &finish('endCell', 1);
    &trim(1);
    &collapse(1);
    &finish('endRow', 1);
    &start('endRow');
    &start('endCell');
  } else {
    #&puts(" \\\\ ");
    &par;
  }
}

sub ampersand {
  if ($wait[$#level] eq 'endCell') {
    &finish('endCell',1);
    &trim(1);
    &collapse(1);
    &start('endCell');
  }
}

sub matrix {
  &start('endMatrix');
  &start('endRow');
  &start('endCell');
}

sub endmatrix {
  &finish('endCell',1);
  &trim(1);
  &collapse(1);
  &finish('endRow',1);
  # Now chunks correspond to rows of the matrix, records inside chunks to
  # Cells
  &halign(split(";",shift));
  &finish('endMatrix',1);
}

sub endmatrixArg {
  &endmatrix(join(";",($_[0],split("",pop(@argStack)))));
}

# Takes a matrix in the following form: chunks on the last level
# are row of the matrix, records inside chunks are cells.
# Puts the resulting matrix in the first record on the given level
# and truncates the rest

# I'm trying to add parameters:
#	length to insert between columns
#	Array of centering options one for a column (last one repeated if needed)
#		Currently supported:	c for center
#					r for right
#					l for left

sub halign {
  local($explength)=(shift);
  local(@c)=@_;
  local($last,$le,$b,$h);
  local(@w)=();
  #warn "levels @level, chunks @chunks, records @out\n";
  # Find metrics of cells
  for $r (0..$#chunks-$level[$#level]) {
    $last= ($r==$#chunks-$level[$#level]) ? $#out:
                                            $chunks[$r+1+$level[$#level]]-1;
  warn "Row $r: last column " . ($last-$chunks[$r+$level[$#level]]) ."\n"
                                if $debug & $debug_matrix;
    for $c (0..$last-$chunks[$r+$level[$#level]]) {
      ($h,$le,$b)=
                ($out[$chunks[$r+$level[$#level]]+$c] =~ /(\d+),(\d+),(\d+)/);
        # Format is Height:Length:Baseline
      $w[$c]=$le unless $w[$c]>$le;
    }
  }
  # expand the height and depth
  for $c (0..$#w-1) {$w[$c]+=$explength;}
  # Extend the @c array by the last element or "c" if it is empty
  @c=("c") x @w unless @c;
  @c=(@c,($c[$#c]) x (@w-@c));
  # Now expand the cells
  warn "Widths of columns @w\n" if $debug & $debug_matrix;
  for $r (0..$#chunks-$level[$#level]) {
    $last= ($r==$#chunks-$level[$#level]) ? $#out:
                                            $chunks[$r+1+$level[$#level]]-1;
    warn "Row $r: last column " . ($last-$chunks[$r+$level[$#level]]) ."\n"
        if $debug & $debug_matrix;
    for $c (0..$last-$chunks[$r+$level[$#level]]) {
      if ($c[$c] eq "c") {
        warn "Centering row $r col $c to width $w[$c]\n"
            if $debug & $debug_matrix;
        $out[$chunks[$r+$level[$#level]]+$c]=
          &center($w[$c],$out[$chunks[$r+$level[$#level]]+$c]);
      } elsif ($c[$c] eq "l") {
        warn "Expanding row $r col $c to width $w[$c]\n"
            if $debug & $debug_matrix;
        $out[$chunks[$r+$level[$#level]]+$c]=
          &join($out[$chunks[$r+$level[$#level]]+$c],
                &string2record(" " x
                  ($w[$c] - &length($out[$chunks[$r+$level[$#level]]+$c]))));
      } elsif ($c[$c] eq "r") {
        warn "Expanding row $r col $c to width $w[$c] on the left\n"
            if $debug & $debug_matrix;
        $out[$chunks[$r+$level[$#level]]+$c]=
          &join(&string2record(" " x
                  ($w[$c]-$explength-
                       &length($out[$chunks[$r+$level[$#level]]+$c]))),
                $out[$chunks[$r+$level[$#level]]+$c]);
        $out[$chunks[$r+$level[$#level]]+$c]=
          &join($out[$chunks[$r+$level[$#level]]+$c],
                &string2record(" " x $explength));
      } else {warn "Unknown centering option `$c[$c]' for halign";}
    }
  }
  # Now we creat rows
  &collapseAll;
  # And stack them vertically
  for ($chunks[$level[$#level]]+1..$#out) {
    $out[$chunks[$level[$#level]]]=&vStack($out[$chunks[$level[$#level]]],
                                           $out[$_]);
  }
  &setbaseline($out[$chunks[$level[$#level]]],
               int((&height($out[$chunks[$level[$#level]]])-1)/2));
  $#chunks=$level[$#level];
  $#out=$chunks[$level[$#level]];
}

sub close_curly {
  &finish("}");
  #&puts("}") unless $tokenByToken[$#level]; # well, this can change under our foot...
}

sub at {
  local($c,$first,$second,$t,$m)=($par =~ /^(.)/);
  if ($c eq '@') {&puts('@');$par =~ s/^.//;}
  elsif (index("<>AV",$c)>=0) {
    $m="&" if ($wait[$#level] eq 'endCell');
    $m="&&" if $m eq "&" && index("AV",$c)>=0;
    &ampersand if $m eq "&";
    $par =~ s/^.//;
    $first=$second="";
    while (($t=&get_balanced()) ne $c && defined $t) {
      $first .= $t;
    }
    while (($t=&get_balanced()) ne $c && defined $t) {
      $second .= $t;
    }
    $par="{$first}{$second}$m" . $par;
    local($l,$r);
    ($l=$c) =~ tr/A>V/^/d;
    ($r=$c) =~ tr/<A//d;
    index("<>",$c)>=0 ?
       &start(2,"f_arrow;$l;$r"):
       &start(2,"f_arrow_v;$l;$r");
  }
  elsif ($c eq "." && $wait[$#level] eq 'endCell') {
    &ampersand;
    &ampersand;
    $par =~ s/^.//;
  }
  else {&puts('@');}
}

# takes two tips of arrow as argument separated by ";",
# we assume that total length is 1

sub f_arrow {
  warn "Entering f_arrow...\n" if $debug & $debug_flow;
  local($l,$r)=split(";",shift);
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  warn "Over: $out[$#out-1]\nUnder: $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($l1,$l2)=(&length($out[$#out-1]),&length($out[$#out]));
  local($len)=(($l1>$l2 ? $l1: $l2));
  $out[$#out-1]=&vStack(&vStack(&center($len+4,$out[$#out-1]),
                         &string2record(" $l" ."-" x ($len+1) . "$r ")),
                 &center($len+4,$out[$#out]));
  $#chunks--;
  $#out--;
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(2,1);
}

# takes two tips of arrow as argument separated by ";",
# we assume that total length is 1

sub f_arrow_v {
  warn "Entering f_arrow_v...\n" if $debug & $debug_flow;
  local($l,$r)=split(";",shift);
  &trim(2);
  &collapse(2);
  &assertHave(2) || &finish("",1);
  warn "Over: $out[$#out-1]\nUnder: $out[$#out]\n__END__\n" if $debug & $debug_record;
  local($h1,$b1)=($out[$#out-1] =~ /^(\d+),\d+,(\d+)/);
  local($h2,$b2)=($out[$#out] =~ /^(\d+),\d+,(\d+)/);
  local($b)=(($b1>$b2 ? $b1: $b2));
  local($res)=(&join($out[$#out-1],$out[$#out]));
  local($h,$bb)=($res =~ /^(\d+),\d+,(\d+)/);
  $bb=$b+1;
  $out[$#out-1]=&vStack(&vputs(" " x ($b-$b1+1)),
                        $out[$#out-1]);
  #$out[$#out-1] =~ s/^(\d+,\d+,)(\d+)/\1$bb/;
  &setbaseline($out[$#out-1],$bb);
  $out[$#out]=&vStack(&vputs(" " x ($b-$b2+1)),
                                     $out[$#out]);
  #$out[$#out] =~ s/^(\d+,\d+,)(\d+)/\1$bb/;
  &setbaseline($out[$#out],$bb);
  $out[$#out-1]=&join(&join($out[$#out-1],
                         &vputs($l ."|" x ($h+1) . $r,$b+1)),
                      $out[$#out]);
  $#chunks--;
  $#out--;
  warn "a:Last $#chunks, the first on the last level=$#level is $level[$#level]" if $debug & $debug_flow;
  &finish(2,1);
}

sub noindent {
  if ($#out == 0 && $#chunks == 0 && $out[$#out] eq '1,5,0,0,     ') {
    $#out--;
    $#chunks--;
  } else {
    &puts('\\noindent');
  }
}

# put strings vertically, returns a record with the second argument as baseline

sub vputs {
  local($b)=($_[1]);
  $b=0 unless defined $b;
  return length($_[0]) . ",1,$b,0," . join("\n",split('',$_[0]));
}

sub choose {
  if ($wait[$#level] eq '}') {
    local($prevw)=($wait[$#level-1]);
    $wait[$#level-1]="junk";
    &finish("}",1);
          &collapse(1);
          &assertHave(1) || &finish("",1);
    local($rec)=$out[$#out];
    $#out--;
    $#chunks--;
    &start(2,"f_choose");
    $wait[$#level-1]=$prevw;
    &start("}");
    &commit($rec);
    &finish("}",1);
    &start("}");
  } else {&puts("\\choose");}
}

sub over {
  if ($wait[$#level] eq '}') {
    local($prevw)=($wait[$#level-1]);
    $wait[$#level-1]="junk";
    &finish("}", 1);
          &collapse(1);
          &assertHave(1) || &finish("",1);
    local($rec)=$out[$#out];
    $#out--;
    $#chunks--;
    &start(2,"f_fraction");
    $wait[$#level-1]=$prevw;
    &start("}");
    &commit($rec);
    &finish("}",1);
    &start("}");
  } else {&puts("\\over");}
}

# Takes a record, height, baseline, spaces_toleft and _toright
# and makes this record this high

sub makehigh {
  local($str)=(split(",",$_[0],5))[4];
  local($h,$b,$d)=($_[1],$_[2]+1);
  warn "Entering makehigh(@_)\n" if $debug & $debug_flow;
  if ($str eq ".") {$_[0] =~ s/\.$/ /;return;}
  #$str="<" if $str eq "\\langle";
  #$str=">" if $str eq "\\rangle";
  $h=1 unless $h;
  $d=$h-$b;
  return if $h<2 || $h==2 && index("()<>",$str)>=0;
  local(@c);
  # split pattern:
  #  0: base string
  #  1: oneside expander
  #  2: real expander
  #  3: top tip
  #  4: bottom top
  #  5: mid
  if    ($str eq "(") {@c=split(":",'(: :│:╭:╰:│');}
  elsif ($str eq ")") {@c=split(":",'): :│:╮:╯:│');}
  elsif ($str eq "{") {@c=split(":",'{: :│:╭:╰:╡');}
  elsif ($str eq "}") {@c=split(":",'}: :│:╮:╯:╞');}
  elsif ($str eq "|" && $str eq "||")
                      {@c=split(":",'|:|:|:|:|:|');}
  elsif ($str eq "[") {@c=split(":",'[: :│:┌:└:│');}
  elsif ($str eq "]") {@c=split(":",']: :│:┐:┘:│');}
  elsif ($str eq "<" || $str eq ">") {
    return if $h==2;
    local($l)=($b);
    $l = $d+1 if $b < $d+1;
    for (2..$l) {
      $_[0]=&join($_[0], &vputs("⧸" . " " x (2*$_-3) . "⧹",$_-1)) if $str eq "<";
      $_[0]=&join(&vputs("⧹" . " " x (2*$_-3) . "⧸",$_-1), $_[0]) if $str eq ">";
    }
    if ($str eq "<") {
      $_[0] = &join($_[0], &string2record(" "));
      $_[0] =~ s/< / ⟨/;
    }
    elsif ($str eq ">") {
      $_[0]=&join(&string2record(" "), $_[0]);
      $_[0] =~ s/>/⟩/;
    }
    return;
  }
  else {return;}
  
  # form initial typesetting
  $_[0]=&vputs(&makecompound($b,$d,@c), $b-1);

  # pad out the shape with spaces
  $_[0]=&join($_[0],$_[0]) if length($str)==2;
  $_[0]=&join(&string2record(" " x $_[3]),$_[0]) if $_[3];
  $_[0]=&join($_[0],&string2record(" " x $_[4])) if $_[4];
}


sub right {
  &finish("LeftRight",1);
  &trim(1);
  &collapse(1);
}

sub f_left {
  &trim(1);
  &collapse(1);
  &finish(1);
  &start("LeftRight");
}

sub left {
  &start(3,"f_leftright");
  $tokenByToken[$#level]=1;
  &start(1,"f_left");
  $tokenByToken[$#level]=1;
}

sub f_leftright_go {
  &trim(1);
  &collapse(1);
  local($l,$r)=split(";",shift);
  &assertHave(1) || warn "Left-Right not balanced";
  local($rec)=($out[$#out]);
  $#out--;
  $wait[$#level]="junk";
  &start(3,"f_leftright");
  &puts($l);
  &commit($rec);
  &puts($r);
  &finish("junk");
}

sub beg_lr {
  &start(1,"f_leftright_go" . ";" . shift);
  $tokenByToken[$#level]=1;
}

sub f_leftright {
  &trim(1);
  &collapse(1);
  &assertHave(3) || warn "Left-Right not balanced";
  local($h,$b)=($out[$#out-1] =~ /^(\d+),\d+,(\d+)/)[0,1];
  &makehigh($out[$#out-2],$h,$b,0,1);
  &makehigh($out[$#out],$h,$b,1,0);
  &finish(3);
}

# Arguments from $b/$d:
#
#  0: ascent (number)
#  1: descent (number)
#
# Arguments from @c:
#
#  2: base string
#  3: oneside expander
#  4: real expander
#  5: top tip
#  6: bottom top
#  7: mid
#
# All component should be one character long
sub makecompound {
  $ascent = $_[0];
  $descent = $_[1];

  $base = $_[2];
  $exp_one_side = $_[3];
  $exp_real = $_[4];
  $top = $_[5];
  $bottom = $_[6];
  $middle = $_[7];

  # Note that this will go wrong for:
  #
  #    =
  #  \begin{bmatrix}
  #    1 & (z \cdot t) & (z \cdot t)^2
  #  \end{bmatrix}
  #
  # where it places the resulting ascii a line too low,
  # and I don't know why...
  #
  # - Pomax

  if ($ascent >= 1 && $descent > 0 && $exp_real eq $middle) {
    return $top . $exp_real x ($ascent + $descent - 2) . $bottom;
  }

  # No descent:
  if ($descent <= 0) {
    return $exp_one_side x ($ascent - 1) . $base;
  }

  # No ascent:
  if ($ascent <= 1) {
    return $base . $exp_one_side x ($descent - 0);
  }

  $above = ($ascent >= 2) ? $top . $exp_real x ($ascent - 2) : $top;
  $below = ($descent > 1) ? $exp_real x ($descent - 1) . $bottom : $bottom;
  return $above . $middle . $below;
}

sub arg2stack {push(@argStack,&get_balanced());}

sub par {&finishBuffer;&commit("1,5,0,0,     ")
	   unless $par =~ s/^\s*\\noindent\s*(\s+|([^a-zA-Z\s])|$)/\2/;}

$type{"\\sum"}="record";
$contents{"\\sum"}="3,3,1,0," . <<'EOF';
__ 
❯  
‾‾ 
EOF

$type{"\\int"}="record";
$contents{"\\int"}="3,3,1,0," . <<'EOF';
 ╭ 
 |
 ╯ 
EOF

$type{"\\prod"}="record";
$contents{"\\prod"}="2,3,1,0," . <<'EOF';
___
│ │
EOF

$type{"\\Sigma"}="record";
$contents{"\\Sigma"}="3,2,1,0," . <<'EOF';
__
❯ 
‾‾
EOF

$type{"\\textit"}="string";
$contents{"\\textit"}=" ";

$type{"\\oplus"}="string";
$contents{"\\oplus"}="⊕";

$type{"\\otimes"}="string";
$contents{"\\otimes"}="⊗";

$type{"\\ominus"}="string";
$contents{"\\ominus"}="⊖";

$type{"\\leq"}="string";
$contents{"\\leq"}="≤";

$type{"\\equiv"}="string";
$contents{"\\equiv"}="≡";

$type{"\\geq"}="string";
$contents{"\\geq"}="≥";

$type{"\\partial"}="string";
$contents{"\\partial"}="∂";

$type{"\\forall"}="string";
$contents{"\\forall"}="∀";

$type{"\\exists"}="string";
$contents{"\\exists"}="∃";

$type{"\\owns"}="string";
$contents{"\\owns"}="∋";

$type{"\\ni"}="string";
$contents{"\\ni"}="∌";

$type{"\\in"}="string";
$contents{"\\in"}="∈";

$type{"\\notin"}="string";
$contents{"\\notin"}="∉";

$type{"\\qed"}="string";
$contents{"\\qed"}="∎";

$type{"\\pm"}="string";
$contents{"\\pm"}="±";

$type{"\\mp"}="string";
$contents{"\\mp"}="∓";

$type{"\\cong"}="string";
$contents{"\\cong"}="≅";

$type{"\\neq"}="string";
$contents{"\\neq"}="≠";

$type{"\\nmid"}="string";
$contents{"\\nmid"}="∤";

$type{"\\subset"}="string";
$contents{"\\subset"}="⊂";

$type{"\\subseteq"}="string";
$contents{"\\subseteq"}="⊆";

$type{"\\supseteq"}="string";
$contents{"\\subseteq"}="⊇";

$type{"\\supset"}="string";
$contents{"\\supset"}="⊃";

$type{"\\sqrt"}="sub1";
$contents{"\\sqrt"}="radical";

$type{"\\buildrel"}="sub3";
$contents{"\\buildrel"}="buildrel";

$type{"\\frac"}="sub2";
$contents{"\\frac"}="fraction";

$type{"\\LITERALnoLENGTH"}="sub1";
$contents{"\\LITERALnoLENGTH"}="literal_no_length";

for ("text","operatorname","operatornamewithlimits","relax","-",
     "notag","!","/","protect","mathcal","Bbb","bf","it","em","boldsymbol",
     "cal","Cal","goth","ref","maketitle","expandafter","csname","endcsname",
     "makeatletter","makeatother","topmatter","endtopmatter","rm",
     "NoBlackBoxes","document","TagsOnRight","bold","dsize","roster",
     "endroster","endkey","endRefs","enddocument","displaystyle",
     "twelverm","tenrm","twelvefm","tenfm","hbox","mbox") {
  $type{"\\$_"}="nothing";
}
for ("par","endtitle","endauthor","endaffil","endaddress","endemail",
     "endhead","key","medskip","smallskip","bigskip","newpage",
     "vfill","eject","endgraph") {
  $type{"\\$_"}="sub";
  $contents{"\\$_"}="par";
}

for ("proclaim","demo",) {
  $type{"\\$_"}="par_self";
}

for ("endproclaim","enddemo",) {
  $type{"\\$_"}="self_par";
}

#$type{"&"}="nothing";

$type{"\\let"}="sub";
$contents{"\\let"}="let_exp";

$type{"\\def"}="sub";
$contents{"\\def"}="def_exp";

$type{"\\item"}="sub";
$contents{"\\item"}="item";

$type{"{"}="sub";
$contents{"{"}="open_curly";

$type{"}"}="sub";
$contents{"}"}="close_curly";

$type{"&"}="sub";
$contents{"&"}="ampersand";

$type{'$'}="sub";
$contents{'$'}="dollar"; # START OF INLINE PARSING

$type{'$$'}="sub";
$contents{'$$'}="ddollar"; # START OF BLOCK PARSING

$type{'\\\\'}="sub";
$contents{'\\\\'}="bbackslash";

$type{"^"}="sub1";
$contents{"^"}="superscript";

$type{"_"}="sub1";
$contents{"_"}="subscript";

$type{"@"}="sub";
$contents{"@"}="at";

$type{"\\over"}="sub";
$contents{"\\over"}="over";


$type{"\\choose"}="sub";
$contents{"\\choose"}="choose";

$type{"\\noindent"}="sub";
$contents{"\\noindent"}="noindent";


$type{"\\left"}="sub";
$contents{"\\left"}="left";

$type{"\\right"}="sub";
$contents{"\\right"}="right";

$type{"\\underline"}="sub1";
$contents{"\\underline"}="underline";

$type{"\\overline"}="sub1";
$contents{"\\overline"}="overline";

$type{"\\bar"}="sub1";
$contents{"\\bar"}="overline";

$type{"\\v"}="sub1";
$contents{"\\v"}="putover_string;v";

$type{"\\widetilde"}="sub1";
$contents{"\\widetilde"}="widetilde";

$type{"\\~"}="sub1";
$contents{"\\~"}="putover_string;~";

$type{"\\tilde"}="sub1";
$contents{"\\tilde"}="putover_string;~";

$type{"\\widehat"}="sub1";
$contents{"\\widehat"}="widehat";

$type{"\\hat"}="sub1";
$contents{"\\hat"}="putover_string;^";

$type{"\\^"}="sub1";
$contents{"\\^"}="putover_string;^";

$type{'\\"'}="sub1";
$contents{'\\"'}='putover_string;"';

$type{'\\dot'}="sub1";
$contents{'\\dot'}='putover_string;.';

$type{"\\not"}="sub1";
$contents{"\\not"}="not";

$type{"\\label"}="sub1";
$contents{"\\label"}="putpar;(;)";

$type{"\\eqref"}="sub1";
$contents{"\\eqref"}="putpar;(;)";

$type{"\\cite"}="sub1";
$contents{"\\cite"}="putpar;[;]";

$type{"\\begin"}="sub1";
$contents{"\\begin"}="begin";

$type{"\\end"}="sub1";
$contents{"\\end"}="end";

for ('@',"_","\$","{","}","#","&","arccos","arcsin","arctan","arg","cos",
    "cosh","cot","coth","csc","deg","det","dim","exp","gcd","hom",
    "inf","ker","lg","lim","liminf","limsup","ln","log","max","min",
    "mod","Pr","sec","sin","sinh","sup","tan","tanh", "%") {
  $type{"\\$_"}="self";
}

for ("bibliography","myLabel","theoremstyle","theorembodyfont",
     "bibliographystyle","hphantom","vphantom","phantom","hspace") {
  $type{"\\$_"}="discard1";
}

for ("numberwithin","newtheorem","renewcommand","setcounter"
    ) {
  $type{"\\$_"}="discard2";
}

for ("equation","gather","align"
     ) {$environment{"$_"}="ddollar,ddollar";}

for ("matrix","CD","smallmatrix"
     ) {$environment{"$_"}="matrix,endmatrix;1;c";}

for ("document","split","enumerate"
     ) {$environment_none{"$_"}++;}

$environment{"Sb"}="subscript:matrix,endmatrix;1;l";

$environment{"Sp"}="superscript:matrix,endmatrix;1;l";

$environment{"eqnarray"}="ddollar:matrix,endmatrix;0;r;c;l:ddollar";
$environment{"split"}="ddollar:matrix,endmatrix;0;r;l:ddollar";
$environment{"multiline"}="ddollar:matrix,endmatrix;0;r;l:ddollar";
$environment{"align"}="ddollar:matrix,endmatrix;0;r;l:ddollar";
$environment{"aligned"}="matrix,endmatrix;0;r;l";
$environment{"gather"}="ddollar:matrix,endmatrix;0;c:ddollar";
$environment{"gathered"}="matrix,endmatrix;0;c";
$environment{"array"}="arg2stack:matrix,endmatrixArg;1";

# $environment{"pmatrix"}="beg_lr;(;):matrix,endmatrix;1;c";
$environment{"bmatrix"}="beg_lr;[;]:matrix,endmatrix;1;c";
$environment{"vmatrix"}="beg_lr;|;|:matrix,endmatrix;1;c";

$type{"~"}="string";
$contents{"~"}=" ";

$type{"\\,"}="string";
$contents{"\\,"}=" ";

$type{"\\dots"}="string";
$contents{"\\dots"}="...";

$type{"\\ldots"}="string";
$contents{"\\ldots"}="...";

$type{"\\cdots"}="string";
$contents{"\\cdots"}="⋯";

$type{"\\colon"}="string";
$contents{"\\colon"}=": ";

$type{"\\mid"}="string";
$contents{"\\mid"}=" | ";

$type{"\\smallsetminus"}="string";
$contents{"\\smallsetminus"}=" ⧵ ";

$type{"\\setminus"}="string";
$contents{"\\setminus"}=" ⧹ ";

$type{"\\backslash"}="string";
$contents{"\\backslash"}="\\";

$type{"\\approx"}="string";
$contents{"\\approx"}=" ≅ ";

$type{"\\simeq"}="string";
$contents{"\\simeq"}=" ≃ ";

$type{"\\quad"}="string";
$contents{"\\quad"}="   ";

$type{"\\qquad"}="string";
$contents{"\\qquad"}="     ";

$type{"\\Delta"}="string";
$contents{"\\Delta"}="△";

$type{"\\Pi"}="string";
$contents{"\\Pi"}="π";

$type{"\\alpha"}="string";
$contents{"\\alpha"}="α";

$type{"\\to"}="string";
$contents{"\\to"}=" ──> ";

$type{"\\from"}="string";
$contents{"\\from"}=" <── ";

$type{"\\wedge"}="string";
$contents{"\\wedge"}="∧";

$type{"\\Lambda"}="string";
$contents{"\\Lambda"}="∨";

$type{"\\ltimes"}="string";
$contents{"\\ltimes"}="⋉";

$type{"\\lhd"}="string";
$contents{"\\lhd"}=" ⊲ ";

$type{"\\rhd"}="string";
$contents{"\\rhd"}=" ⊳ ";

$type{"\\cdot"}="string";
$contents{"\\cdot"}=" · ";

$type{"\\circ"}="string";
$contents{"\\circ"}=" o ";

$type{"\\bullet"}="string";
$contents{"\\bullet"}="•";

$type{"\\infty"}="string";
$contents{"\\infty"}="∞";

$type{"\\rtimes"}="string";
$contents{"\\rtimes"}=" ⋊ ";

$type{"\\times"}="string";
$contents{"\\times"}=" × ";

$type{"\\hookrightarrow"}="string";
$contents{"\\hookrightarrow"}=" ↪ ";

$type{"\\hookleftarrow"}="string";
$contents{"\\hookleftarrow"}=" ↩ ";

$type{"\\longleftarrow"}="string";
$contents{"\\longleftarrow"}=" <──── ";

$type{"\\longleftrightarrow"}="string";
$contents{"\\longleftrightarrow"}=" <────> ";

$type{"\\longrightarrow"}="string";
$contents{"\\longrightarrow"}=" ────> ";

$type{"\\rightarrow"}="string";
$contents{"\\rightarrow"}=" ──> ";

$type{"\\leftarrow"}="string";
$contents{"\\leftarrow"}=" <── ";

$type{"\\mapsto"}="string";
$contents{"\\mapsto"}=" ├──> ";

$type{"\\longmapsto"}="string";
$contents{"\\longmapsto"}=" ├────> ";

$type{"\\cap"}="string";
$contents{"\\cap"}=" ∩ ";

$type{"\\cup"}="string";
$contents{"\\cup"}=" ∪ ";

$type{"\\section"}="string";
$contents{"\\section"}="Section ";

$type{"\\subsection"}="string";
$contents{"\\subsection"}="Subsection ";

$type{"\|"}="string";
$contents{"\|"}="||";

$type{'\;'}="string";
$contents{'\;'}=" ";

$type{'\noindent'}="string";
$contents{'\noindent'}="";


&define('\\define','\\def');
&define('\\ge','\\geq');
&define('\\le','\\leq');
&define('\\ne','\\neq');
&define('\\langle','<');
&define('\\rangle','>');
&define('\\subheading','\\par\\underline');
&define('\\(','$');
&define('\\)','$');

# Interestingly, since this script was written, LaTeX went
# the opposite direction: rather than the $$ syntax, folks
# are supposed to use \[ and \]
&define('\\[','$$');
&define('\\]','$$');

&define('\\centerline#1','$$#1$$');
&define('\\eqalign#1','\\aligned #1 \\endaligned');
&define('\\cr','\\\\');
&define('\\sb','_');
&define('\\sp','^');
&define('\\proclaim','\\noindent ');

&defb("matrix","vmatrix","Vmatrix","smallmatrix","bmatrix","Sp","Sb","CD","align","aligned","split","multiline","gather","gathered");

if ($opt_TeX) {
  &define('\pmatrix#1','\left(\begin{matrix}#1\end{matrix}\right)');
} else {
  $environment{"pmatrix"}="beg_lr;(;):matrix,endmatrix;1;c";
  &defb("pmatrix") unless $opt_TeX;
}

## All the records should be specified before this point
{
  local(@a)=grep("record" eq $type{$_},keys %type);
  for (@a) {
    chop $contents{$_} if substr($contents{$_},length($contents{$_})-1,1) eq "\n";
  }
}

for ("oplus","otimes","cup","wedge") {
  $type{"\\big$_"}=$type{"\\$_"};
  $contents{"\\big$_"}=$contents{"\\$_"};
}


@level=(0);
@chunks=(0);
@tokenByToken=(0);
@out=();
$curlength=0;
$debug_flow=1;
$debug_record=2;
$debug_parsing=4;
$debug_length=8;
$debug_matrix=16;

#$debug |= $debug_flow | $debug_record | $debug_parsing | $debug_length;
#$debug |= $debug_flow;
#$debug |= $debug_record;
#$debug |= $debug_parsing;
#$debug |= $debug_length;
#$debug |= $debug_matrix;


# =============================
#   Run the script by looping
# paragraph parsing until there
#   is nothing left to parse.
# =============================


$/ = $opt_by_par ? "\n\n" : ''; # whole paragraph mode
while (&paragraph()) { }
&finishBuffer;

__END__

# History: Jul 98: \choose added, fixed RE for \noindent, \eqalign and \cr.
#			\proclaim and better \noindent added.
# Sep 98: last was used inside an if block, was leaking out.
# Jan 00: \sb \sp
# Feb 00: remove extraneous second EOF needed at end.
	  remove an empty line at end of output
	  New option -by_par to support per-paragraph processing
	  New option -TeX which support a different \pmatrix
	  New option -ragged to not insert whitespace to align right margin.
	  New option -noindent to not insert whitespace at beginning.
	  Ignore \\ and \cr if followed by \end{whatever}.
	  Ignore \noindent if not important.
	  Ignore whitespace paragraphs.
# Apr 00: Finishing a level 1 would not merge things into one chunk.
# May 00: Additional argument to finish() to distinguish finishing
	  things which cannot be broken between lines.
# Sep 00: Add support for new macro for strings with screen escapes sequences:
	  \LITERALnoLENGTH{escapeseq}.
# Oct 00: \LITERALnoLENGTH can have a chance to work in the baseline only;
	   in fact the previous version did not work even there...
	  If the added record is longer than line length, do not try to
	  break the line before it...
