Add-Type -AssemblyName System.Drawing
$w=1200;$h=630
$bmp=New-Object System.Drawing.Bitmap($w,$h)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode='AntiAlias';$g.TextRenderingHint='AntiAlias'

$bg   =[System.Drawing.Color]::FromArgb(255,5,7,15)
$cyan =[System.Drawing.Color]::FromArgb(255,0,229,255)
$purple=[System.Drawing.Color]::FromArgb(255,168,85,247)
$text =[System.Drawing.Color]::FromArgb(255,234,240,255)
$muted=[System.Drawing.Color]::FromArgb(255,139,147,176)
$line =[System.Drawing.Color]::FromArgb(255,60,70,110)

$g.Clear($bg)

# thin frame
$gp1=New-Object System.Drawing.Drawing2D.GraphicsPath
$gp1.AddEllipse(-320,-320,1280,1280)
$p1=New-Object System.Drawing.Drawing2D.PathGradientBrush($gp1)
$p1.CenterColor=[System.Drawing.Color]::FromArgb(46,168,85,247)
$p1.SurroundColors=@([System.Drawing.Color]::FromArgb(0,0,0,0))
$g.FillPath($p1,$gp1)

$gp2=New-Object System.Drawing.Drawing2D.GraphicsPath
$gp2.AddEllipse(560,-140,1400,1000)
$p2=New-Object System.Drawing.Drawing2D.PathGradientBrush($gp2)
$p2.CenterColor=[System.Drawing.Color]::FromArgb(38,0,229,255)
$p2.SurroundColors=@([System.Drawing.Color]::FromArgb(0,0,0,0))
$g.FillPath($p2,$gp2)

# thin frame
$penL=New-Object System.Drawing.Pen($line,2)
$g.DrawRectangle($penL,24,24,$w-49,$h-49)

# particle constellation (like the hero canvas)
$rand=New-Object System.Random(42)
$pts=@()
for($i=0;$i -lt 46;$i++){
  $px=40+$rand.NextDouble()*($w-80); $py=40+$rand.NextDouble()*($h-80)
  $pts+=,@($px,$py)
}
$penD=New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(34,0,229,255),1)
for($i=0;$i -lt $pts.Count;$i++){
  for($j=$i+1;$j -lt $pts.Count;$j++){
    $dx=$pts[$i][0]-$pts[$j][0]; $dy=$pts[$i][1]-$pts[$j][1]
    $d=[Math]::Sqrt($dx*$dx+$dy*$dy)
    if($d -lt 150){
      $alpha=[int](28*(1-$d/150))
      $penD.Color=[System.Drawing.Color]::FromArgb($alpha,0,229,255)
      $g.DrawLine($penD,$pts[$i][0],$pts[$i][1],$pts[$j][0],$pts[$j][1])
    }
  }
}
$bC=New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(150,0,229,255))
foreach($p in $pts){ $g.FillEllipse($bC,$p[0]-2,$p[1]-2,4,4) }

# kicker
$fK=New-Object System.Drawing.Font('Consolas',17)
$bA=New-Object System.Drawing.SolidBrush($cyan)
$g.DrawString('// HI, I''M - CS STUDENT & WEB DEVELOPER, HYDERABAD',$fK,$bA,56,72)

# name
$fN=New-Object System.Drawing.Font('Sora',60,[System.Drawing.FontStyle]::Bold)
$bT=New-Object System.Drawing.SolidBrush($text)
$g.DrawString('Fazeel Abdur Rahman Khan.',$fN,$bT,50,130)

# gradient role line
$fR=New-Object System.Drawing.Font('Sora',27,[System.Drawing.FontStyle]::Bold)
$brushG=New-Object System.Drawing.Drawing2D.LinearGradientBrush((New-Object System.Drawing.Rectangle(50,232,700,50)),$cyan,$purple,0.0)
$g.DrawString('I like building websites, tools & voice assistants.',$fR,$brushG,50,236)

# sub lines
$fS=New-Object System.Drawing.Font('Consolas',19)
$bM=New-Object System.Drawing.SolidBrush($muted)
$g.DrawString('zero frameworks - all handwritten - deployed on GitHub Pages',$fS,$bM,56,306)

# project chips (bottom)
$fC=New-Object System.Drawing.Font('Consolas',15)
$penC=New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90,0,229,255),1)
$x=56; $yC=540
foreach($t in @('J.A.R.V.I.S - AI voice assistant','official college website - LIVE','35+ C/C++ programs')){
  $sz=$g.MeasureString($t,$fC)
  $pad=14
  $bw=$sz.Width+$pad*2; $bh=$sz.Height+10
  $g.DrawRectangle($penC,$x,$yC,$bw,$bh)
  $g.DrawString($t,$fC,$bM,($x+$pad),($yC+4))
  $x+=($bw+14)
}

$bmp.Save('C:\Users\fazee\OneDrive\portfilo\og-image.png',[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose();$bmp.Dispose()
Write-Output 'og-image regenerated (FAZEEL.DEV identity)'
