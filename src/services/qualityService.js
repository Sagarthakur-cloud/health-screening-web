/**
 * Image Quality Check Service
 * Detects blur, dark, and bright images using pure JS.
 * No AI model required.
 */

export function checkQuality(imageDataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 224, 224);

        const imageData = ctx.getImageData(0, 0, 224, 224);
        const { data } = imageData;

        // ===== 1. Brightness Check =====
        let brightnessSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          brightnessSum += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        const brightness = brightnessSum / (data.length / 4);

        // ===== 2. Blur Check (Laplacian Variance) =====
        let lapSum = 0;
        let lapSqSum = 0;
        let count = 0;

        for (let y = 1; y < 223; y++) {
          for (let x = 1; x < 223; x++) {
            const idx = (y * 224 + x) * 4;
            const center = data[idx];
            const left = data[idx - 4];
            const right = data[idx + 4];
            const top = data[idx - 224 * 4];
            const bottom = data[idx + 224 * 4];

            const lap = 4 * center - left - right - top - bottom;
            lapSum += lap;
            lapSqSum += lap * lap;
            count++;
          }
        }

        const lapMean = lapSum / count;
        const lapVar = lapSqSum / count - lapMean * lapMean;

        // ===== 3. Determine Status =====
        let status = 'good';
        let reason = '';
        let score = 0;

        if (brightness < 40) {
          status = 'dark';
          reason = 'Image is too dark. Move to better lighting.';
          score = Math.round(brightness);
        } else if (brightness > 225) {
          status = 'bright';
          reason = 'Image is too bright. Reduce glare or light.';
          score = Math.round(brightness);
        } else if (lapVar < 100) {
          status = 'blurry';
          reason = 'Image is blurry. Hold the phone steady and refocus.';
          score = Math.round(Math.max(20, lapVar / 2));
        } else {
          // Good image
          status = 'good';
          reason = 'Image quality is good.';
          score = Math.round(Math.min(100, 70 + lapVar / 100));
        }

        resolve({
          status,
          reason,
          score: Math.min(100, score),
          brightness: Math.round(brightness),
          sharpness: Math.round(lapVar),
          metrics: {
            brightness: Math.round(brightness),
            sharpness: Math.round(lapVar),
          },
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
  });
}

/**
 * Human-readable status label
 */
export function getQualityLabel(status) {
  switch (status) {
    case 'good':
      return 'Good Quality';
    case 'dark':
      return 'Too Dark';
    case 'bright':
      return 'Too Bright';
    case 'blurry':
      return 'Blurry Image';
    default:
      return 'Unknown';
  }
}

/**
 * Get color for status
 */
export function getQualityColor(status) {
  switch (status) {
    case 'good':
      return { bg: '#dcfce7', fg: '#15803d', border: '#22c55e' };
    case 'dark':
    case 'bright':
    case 'blurry':
      return { bg: '#fee2e2', fg: '#991b1b', border: '#ef4444' };
    default:
      return { bg: '#fef3c7', fg: '#92400e', border: '#f59e0b' };
  }
}