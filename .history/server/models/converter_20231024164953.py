import tensorflow as tf
from keras.models import load_model
import tensorflowjs as tfjs

model = load_model('best_model.h5')
# print(model.summary())
tfjs.converters.save_keras_model(model, '.')
print('Model formulated')