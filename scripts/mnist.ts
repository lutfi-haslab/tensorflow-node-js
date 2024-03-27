import * as tf from "@tensorflow/tfjs-node";
import { irisDataset } from "../dataset";

export async function MnistModel() {
  const trainData = tf.data.csv(irisDataset, {
    hasHeader: true,
    columnConfigs: {
      label: {
        isLabel: true,
      },
    },
  });

  const processedData = trainData
    .map(({ xs, ys }) => {
      return {
        // get all pixels and put them into a tensor with 28 * 28 * 1
        xs: tf.tensor(Object.values(xs) as tf.TensorLike, [28, 28, 1]).div(255),
        // we need to do one-hot encoding for each label
        ys: tf.oneHot(Object.values(ys)[0] as tf.TensorLike, 10),
      };
    })
    .shuffle(1000)
    .batch(64);
  console.log(processedData);

  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [28, 28, 1],
      filters: 32,
      kernelSize: [5, 5],
      activation: "relu",
    })
  );
  model.add(
    tf.layers.conv2d({
      filters: 32,
      kernelSize: [5, 5],
      activation: "relu",
    })
  );
  model.add(
    tf.layers.maxPooling2d({
      poolSize: [2, 2],
    })
  );
  model.add(
    tf.layers.dropout({
      rate: 0.25,
    })
  );
  model.add(
    tf.layers.conv2d({
      filters: 64,
      kernelSize: [3, 3],
      activation: "relu",
    })
  );
  model.add(
    tf.layers.conv2d({
      filters: 64,
      kernelSize: [3, 3],
      activation: "relu",
    })
  );
  model.add(
    tf.layers.maxPooling2d({
      poolSize: [2, 2],
    })
  );
  model.add(
    tf.layers.dropout({
      rate: 0.25,
    })
  );
  model.add(tf.layers.flatten());

  model.add(
    tf.layers.dense({
      units: 256,
      activation: "relu",
    })
  );
  model.add(
    tf.layers.dropout({
      rate: 0.5,
    })
  );
  model.add(
    tf.layers.dense({
      units: 10,
      activation: "softmax",
    })
  );

  const optimizer = "rmsprop";
  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  model
    .fitDataset(processedData, {
      epochs: 10,
      callbacks: tf.node.tensorBoard("./logdir", {
        updateFreq: "batch",
      }),
    })
    .then(() => {
      model.save("file://mnist");
    });
}
