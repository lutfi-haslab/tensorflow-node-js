import * as tf from "@tensorflow/tfjs-node";

export async function trainA() {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 1, inputShape: [200], activation: "relu" })
  );
  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd",
    metrics: ["MAE"],
  });

  // Generate some random fake data for demo purposes.
  const xs = tf.randomUniform([10000, 200]);
  const ys = tf.randomUniform([10000, 1]);
  const valXs = tf.randomUniform([1000, 200]);
  const valYs = tf.randomUniform([1000, 1]);
  await model.fit(xs, ys, {
    epochs: 100,
    validationData: [valXs, valYs],
    // Add the tensorBoard callback here.
    callbacks: tf.node.tensorBoard("/tmp/fit_logs_1"),
  });
}


