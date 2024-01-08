from flask import Flask, request, jsonify

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/search": {"origins": "*"}})

def concatenate_content(question, answers, comments):
    all_content = question + " " + " ".join(answers) + " ".join(comments)
    return all_content

@app.route('/find_most_similar', methods=['POST'])
def find_most_similar():
    input_data = request.get_json()
    new_question = input_data['q']
    input_data = input_data['results']

    existing_questions = [item['question'] for item in input_data]
    existing_answers = [item['answer'] for item in input_data]
    all_questions = [new_question] + existing_questions
    vectorizer = TfidfVectorizer()
    tfidf_matrix_combined = vectorizer.fit_transform(all_questions + existing_answers)

    cosine_similarities = cosine_similarity(tfidf_matrix_combined[0:1], tfidf_matrix_combined[1:]).flatten()

    most_similar_index = cosine_similarities.argmax()
    most_similar_question_id = input_data[most_similar_index]['id']

    return jsonify({'most_similar_question_id': most_similar_question_id})


if __name__ == '__main__':
    app.run(debug=True)
