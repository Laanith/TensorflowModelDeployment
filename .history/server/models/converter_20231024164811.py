import tensorflow as tf
from keras.models import load_model
from torch import mode

model = load_model('best_model.h5')
print(model.summary())