#!/usr/bin/env bash
# تجميع الحلقة بالمقاسين (من داخل render/). المتغيرات من الحلقة:
#   END = نهاية المشاهد (نهاية بطاقة الرعاية)، INTRO_AT = بداية المقدمة، T = المدة الكاملة (END + 5 خاتمة)
# قبلها: ريندر المشاهد على أجزاء متوازية (عمليتان أو ثلاث):
#   node ../scenes/render.js --from 0 --to 47 --name vA --out .            (9:16، 60fps)
#   node ../scenes/render.js --wide --fps 30 --from 0 --to 47 --name wA --out .   (16:9)
#   ملاحظة: --out نسبي لمجلد scenes، فتأكد أين خرج الملف وانقله إلى render/
set -e
END=${END:?}; INTRO_AT=${INTRO_AT:-8.7}; T=${T:?}; FMT=${1:?"9x16 أو 16x9"}; P=${P:-v}
O="../../../الهوية/out"; parts=$(ls ${P}?.mp4 | sort); n=$(echo "$parts" | wc -l)
ins=""; cc=""; i=0; for f in $parts; do ins="$ins -i $f"; cc="$cc[$i:v]"; i=$((i+1)); done
ffmpeg -y -loglevel error $ins -i $O/intro_$FMT.mp4 -i $O/outro_$FMT.mp4 -i ../audio/mix.wav -filter_complex \
 "${cc}concat=n=$n:v=1:a=0,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=6[base];[$n:v]setpts=PTS+$INTRO_AT/TB[i];[$((n+1)):v]setpts=PTS+$END/TB[o];[base][i]overlay=eof_action=pass:enable='between(t,$INTRO_AT,$INTRO_AT+5)'[x];[x][o]overlay=eof_action=pass:enable='gte(t,$END)'[v]" \
 -map "[v]" -map $((n+2)):a -t $T -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 256k -movflags +faststart ep_$FMT.mp4
ffprobe -v error -show_entries format=duration:stream=width,height -of csv=p=0 ep_$FMT.mp4
