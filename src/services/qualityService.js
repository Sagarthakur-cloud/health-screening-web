export function checkQuality(imageDataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 224, 224);
      const imageData = ctx.getImageData(0, 0, 224, 224);
      const { data } = imageData;

      // Brightness check
      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const brightness = sum / (data.length / 4);

      // Blur check (Laplacian variance)
      let lapSum = 0, lapSqSum = 0, count = 0;
      for (let y = 1; y < 223; y++) {
        for (let x = 1; x < 223; x++) {
          const idx = (y * 224 + x) * 4;
          const center = data[idx];
          const lap = 4 * center
            - data[idx - 4] - data[idx + 4]
            - data[idx - 224 * 4] - data[idx + 224 * 4];
          lapSum += lap;
          lapSqSum += lap * lap;
          count++;
        }
      }
      const lapMean = lapSum / count;
      const lapVar = (lapSqSum / count) - (lapMean * lapMean);

      let status = 'good';
      let reason = '';
      if (brightness < 50) { status = 'dark'; reason = 'Image is too dark'; }
      else if (brightness > 220) { status = 'bright'; reason = 'Image is too bright'; }
      else if (lapVar < 100) { status = 'blurry'; reason = 'Image is blurry'; }

      resolve({
        status,
        reason,
        score: Math.round(Math.min(100, lapVar / 10)),
        brightness: Math.round(brightness),
      });
    };
  });
}