import tensorflow as tf
from keras.models import load_model
import tensorflowjs as tfjs

model = load_model('best_model.h5')
tfjs.converters.save(model, './tfjs_model')
print('Model formulated')
