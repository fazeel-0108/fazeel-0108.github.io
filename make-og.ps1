Add-Type -AssemblyName System.Drawing
$w=1200;$h=630
$bmp=New-Object System.Drawing.Bitmap($w,$h)
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode='AntiAlias';$g.TextRenderingHint='AntiAlias'

$bg    =[System.Drawing.Color]::FromArgb(255,10,10,12)
$amber =[System.Drawing.Color]::FromArgb(255,255,180,84)
$text  =[System.Drawing.Color]::FromArgb(255,236,236,232)
$muted =[System.Drawing.Color]::FromArgb(255,163,163,171)
$faint =[System.Drawing.Color]::FromArgb(255,107,107,116)
$line  =[System.Drawing.Color]::FromArgb(255,35,35,41)

$g.Clear($bg)

# frame + corner ticks
$penL=New-Object System.Drawing.Pen($line,2)
$g.DrawRectangle($penL,24,24,$w-49,$h-49)
$penA=New-Object System.Drawing.Pen($amber,4)
$g.DrawLine($penA,24,84,24,24); $g.DrawLine($penA,24,24,84,24)
$g.DrawLine($penA,$w-84,$h-24,$w-24,$h-24); $g.DrawLine($penA,$w-24,$h-84,$w-24,$h-24)

# oscilloscope trace across the lower third
$penT=New-Object System.Drawing.Pen($amber,3)
$pts=New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
for($x=24;$x -le $w-24;$x+=6){
  $env=[Math]::Sin((($x-24)/($w-48))*[Math]::PI)
  $y=470 + $env*46*[Math]::Sin($x*0.012) + $env*16*[Math]::Sin($x*0.031)
  $pts.Add((New-Object System.Drawing.PointF($x,$y)))
}
$g.DrawLines($penT,$pts.ToArray())

# kicker
$fK=New-Object System.Drawing.Font('Consolas',17)
$bA=New-Object System.Drawing.SolidBrush($amber)
$g.DrawString('// HYDERABAD, INDIA - CS DIPLOMA STUDENT',$fK,$bA,56,72)

# name
$fN=New-Object System.Drawing.Font('Georgia',63,[System.Drawing.FontStyle]::Italic)
$bT=New-Object System.Drawing.SolidBrush($text)
$g.DrawString('Fazeel Abdur Rahman Khan.',$fN,$bT,50,130)

# sub lines
$fS=New-Object System.Drawing.Font('Consolas',19)
$bM=New-Object System.Drawing.SolidBrush($muted)
$g.DrawString('web developer - builds websites, tools and voice assistants',$fS,$bM,56,262)
$bF=New-Object System.Drawing.SolidBrush($faint)
$g.DrawString('zero frameworks - zero templates - all handwritten',$fS,$bF,56,300)

# project chips (bottom)
$fC=New-Object System.Drawing.Font('Consolas',15)
$penC=New-Object System.Drawing.Pen($faint,1)
$x=56; $yC=560
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
Write-Output 'og-image regenerated'
