#!/usr/bin/env python3
"""Cohere Transcribe Arabic: a free, local, open-source (Apache 2.0) Arabic ASR pass.

It gives a more accurate TEXT for Gulf dialect and Arabic-English mixing than Whisper,
but no word timings. So Whisper (step 4) keeps the timings, and this file is the
reference text used to correct Whisper's words in step 5.

Usage:
    python3 scripts/02d_cohere_transcribe.py <work>            # reads <work>/a.wav
    python3 scripts/02d_cohere_transcribe.py <work> --chunk 25  # seconds per piece (default 25)

Writes <work>/cohere.txt (one line per piece, with its start second) and <work>/cohere_full.txt.
First run downloads the model (~4 GB) from Hugging Face; after that it works offline.
Needs: pip install -U transformers torch soundfile  (GPU optional; CPU is slower but works).
"""
import sys, os, argparse

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("work")
    ap.add_argument("--chunk", type=float, default=25.0)
    ap.add_argument("--model", default="CohereLabs/cohere-transcribe-arabic-07-2026")
    a = ap.parse_args()

    wav = os.path.join(a.work, "a.wav")
    if not os.path.exists(wav):
        sys.exit(f"missing {wav} — run the ffmpeg line of step 4 first")

    import soundfile as sf
    import torch
    from transformers import pipeline

    audio, sr = sf.read(wav, dtype="float32")
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    if sr != 16000:
        sys.exit("a.wav must be 16 kHz mono (use the step 4 ffmpeg line)")

    device = 0 if torch.cuda.is_available() else -1
    asr = pipeline("automatic-speech-recognition", model=a.model, device=device)

    step = int(a.chunk * sr)
    lines, full = [], []
    for i in range(0, len(audio), step):
        piece = audio[i:i + step]
        if len(piece) < sr * 0.5:
            continue
        # the model transcribes even non-speech: skip near-silent pieces
        if float((piece ** 2).mean()) ** 0.5 < 0.003:
            continue
        text = asr({"raw": piece, "sampling_rate": sr})["text"].strip()
        if text:
            lines.append(f"[{i / sr:7.1f}] {text}")
            full.append(text)
            print(lines[-1], flush=True)

    with open(os.path.join(a.work, "cohere.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    with open(os.path.join(a.work, "cohere_full.txt"), "w", encoding="utf-8") as f:
        f.write(" ".join(full) + "\n")
    print(f"done: {len(lines)} pieces -> {a.work}/cohere.txt")

if __name__ == "__main__":
    main()
