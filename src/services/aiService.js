import { loadLiteRt, loadAndCompile, Tensor } from '@litertjs/core';

let model = null;

export async function loadModel() {
  if (model) return model;
  try {
    await loadLiteRt('/wasm/');
    model = await loadAndCompile('/models/dr_model.tflite', {
      accelerator: 'webgpu'
    });
  } catch (e) {
    console.warn('WebGPU failed, trying WASM:', e);
    model = await loadAndCompile('/models/dr_model.tflite', {
      accelerator: 'wasm'
    });
  }
  return model;
}

export async function runInference(imageDataUrl) {
  const m = await loadModel();

  const img = new Image();
  img.src = imageDataUrl;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 224, 224);

  const imageData = ctx.getImageData(0, 0, 224, 224);
  const inputArray = new Float32Array(224 * 224 * 3);
  for (let i = 0; i < 224 * 224; i++) {
    inputArray[i * 3] = imageData.data[i * 4] / 255;
    inputArray[i * 3 + 1] = imageData.data[i * 4 + 1] / 255;
    inputArray[i * 3 + 2] = imageData.data[i * 4 + 2] / 255;
  }

  const inputTensor = new Tensor(inputArray, [1, 224, 224, 3]);
  const output = await m.run(inputTensor);
  return Array.from(output.data);
}

// Dummy result for testing (jab tak real model nahi hai)
export function dummyInference() {
  return [0.05, 0.15, 0.65, 0.10, 0.05];
}