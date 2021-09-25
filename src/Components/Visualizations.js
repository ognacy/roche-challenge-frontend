import { memo, useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import axios from "axios";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Legend,
  YAxis,
} from "recharts";
import { BASE_URL } from "../utils/ENV";
import { nextPath } from "../utils/Helpers";
import { chevronBack } from "ionicons/icons";

const Visualizations = () => {
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();

  const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + "-" + month + "-" + year;
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/visuals/get_questions`).then((response) => {
      setQuestions(response.data.questions);
    });
  }, []);

  useEffect(() => {
    if (!selectedQuestion) return null;
    axios
      .get(
        `${BASE_URL}/visuals/get_answers?user_id=user-1&question_id=${selectedQuestion.id}`
      )
      .then((response) => {
        let responses = response.data;
        let arrayResponses = [];
        for (let index = 0; index < responses.timestamp.length; index++) {
          arrayResponses = [
            ...arrayResponses,
            {
              name: dateFormat(responses.timestamp[index]),
              value: responses.responses[index],
            },
          ];
        }
        setAnswers([...arrayResponses]);
      });
  }, [selectedQuestion]);

  if (!questions) return null;

  return (
    <>
      <IonPage className="visualizations">
        <IonHeader>
          <IonToolbar>
            <IonIcon
              icon={chevronBack}
              slot="start"
              size="large"
              color="primary"
              onClick={() => nextPath("/")}
            ></IonIcon>
            <IonTitle>Visualizations</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel>Question</IonLabel>
            <IonSelect
              value={selectedQuestion}
              placeholder="Select One"
              onIonChange={(e) => setSelectedQuestion(e.detail.value)}
            >
              {questions.map((question) => (
                <IonSelectOption value={question} key={question.id}>
                  {question.text}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {selectedQuestion && (
            <div className="horizontalAlignContent">
              {selectedQuestion.text}
            </div>
          )}
          {answers && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={answers}
                margin={{ top: 30, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  height={100}
                  angle={-90}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis dataKey="value" width={5} interval={0} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ff7300"
                  name="Entered Value"
                  yAxisId={0}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default memo(Visualizations);
