from simpletransformers.classification import ClassificationModel
model = ClassificationModel('distilbert', 'Hate-speech-CNERG/dehatebert-mono-english', use_cuda=False)

def detect_hate_speech():

    result, _ = model.predict(["FUCK"])
    print(result)

detect_hate_speech()
