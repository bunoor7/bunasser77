#!/usr/bin/env bash
# مزج السلسلة الاقتصادية: الصوت (‎-16 LUFS) + سرير الموسيقى بخفض جانبي، ثم loudnorm بمرورين إلى ‎-14 LUFS وذروة ‎-1
# الاستعمال: bash mix.sh <المدة الكاملة بالثانية>   (من داخل audio/، بعد voice_ep.wav وmusic_bed.wav)
set -e; T=${1:?المدة}
ffmpeg -y -v error -i voice_ep.wav -i music_bed.wav -filter_complex "[0:a]pan=stereo|c0=c0|c1=c0,apad=whole_dur=$T,asplit[v][sc];[1:a]volume=12.4dB[m];[m][sc]sidechaincompress=threshold=0.02:ratio=3:attack=40:release=450[md];[v][md]amix=inputs=2:normalize=0:duration=longest[o]" -map "[o]" -t $T -c:a pcm_s24le mix_pre.wav
J=$(ffmpeg -hide_banner -i mix_pre.wav -af loudnorm=I=-14:TP=-1:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p')
g(){ echo "$J" | grep "\"$1\"" | grep -o '[-0-9.]*' | head -1; }
ffmpeg -y -v error -i mix_pre.wav -af "loudnorm=I=-14:TP=-1:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -c:a pcm_s24le mix.wav
ffmpeg -y -v error -i mix.wav -b:a 192k mix.mp3
ffmpeg -hide_banner -nostats -i mix.wav -af ebur128=peak=true -f null - 2>&1 | grep -E 'I:|Peak:' | tail -2
