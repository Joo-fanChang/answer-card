import * as React from 'react';
import { Form, InputNumber, Button, Table } from 'antd';
import { v4 as uuid } from 'uuid';
import letters from '@/constants/letters';
import { IQuestionForm } from './getQuestionForm';

const { useState } = React;
const FormItem = Form.Item;
const MAX_SIZE = 200;

const bigQuestion: GlobalValue.IGeneralBigQuestionType = {
  questionId: '',
  questionNo: 1,
  questionTitle: '选择题',
  questionType: 1,
  // 以几个小题为1组
  groupSize: 5,
  questions: [],
};

const subQuestion: GlobalValue.IGeneralQuestionType = {
  questionId: '',
  questionNo: 1,
  questionType: 3,
  height: 10,
  length: 4,
};

interface IChoicesFormProps extends IQuestionForm {
}

const ChoicesForm: React.FC<IChoicesFormProps> = ({ form, questionNumber }) => {
  const [questions, setQuestions] = useState<Array<GlobalValue.IGeneralQuestionType>>([]);

  const changeNumber = () => {
    let number = form.getFieldValue('number');
    if (number > MAX_SIZE) {
      number = MAX_SIZE;
    }
    const currentNumber = questions.length;
    if (number === currentNumber) {
      return;
    }
    let newQuestions: Array<GlobalValue.IGeneralQuestionType> = [];
    if (number > currentNumber) {
      const deltaNumber = number - currentNumber;
      newQuestions = questions.concat(new Array(deltaNumber).fill(0).map((_, idx) =>
        ({
          ...subQuestion,
          questionId: uuid(),
          questionNo: questionNumber + currentNumber + idx + 1,
        })));
    } else if (number < currentNumber) {
      newQuestions = questions.slice(0, number);
    }
    setQuestions(newQuestions);
  };

  const increaseOptions = (questionId: string) => {
    const newQuestions = questions.map(q => {
      if (q.questionId === questionId) {
        if (q.length < 10) {
          q.length += 1;
        }
      }
      return q;
    });
    setQuestions(newQuestions);
  };

  const decreaseOptions = (questionId: string) => {
    const newQuestions = questions.map(q => {
      if (q.questionId === questionId) {
        if (q.length > 4) {
          q.length -= 1;
        }
      }
      return q;
    });
    setQuestions(newQuestions);
  };

  const deleteSubQuestion = (questionId: string) => {
    const newQuestions = questions.filter(q => q.questionId !== questionId);
    // TODO: 重排序号
    setQuestions(newQuestions);
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        onFinish={changeNumber}
        initialValues={{ number: 10 }}
      >
        <FormItem label="题目数量" name="number">
          <InputNumber
            min={1}
            max={MAX_SIZE}
            formatter={val => val ? `${Number.parseInt(val as string)}` : val as string}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
      <br />
      <Table
        rowKey="questionId"
        columns={[{
          title: '题号',
          width: '20%',
          dataIndex: 'questionNo',
        }, {
          title: '选项',
          width: '40%',
          render(_, { length }) {
            return letters.slice(0, length);
          }
        }, {
          title: '操作',
          width: '40%',
          render(_, { questionId }) {
            return (
              <>
                <Button onClick={() => increaseOptions(questionId)}>+</Button> &nbsp;
                <Button onClick={() => decreaseOptions(questionId)}>-</Button> &nbsp;
                <Button onClick={() => deleteSubQuestion(questionId)} danger>Del</Button>
              </>
            );
          }
        }]}
        dataSource={questions}
        locale={{
          emptyText: '赶快添加题目吧'
        }}
        scroll={{
          y: 300,
        }}
        pagination={{
          pageSize: 30,
        }}
      />
    </>
  );
};

export default ChoicesForm;
