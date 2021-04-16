
const React = require('react');
const { useState, useEffect } = require('react');



const Gageboo = () => {
  const [money, setMoney] = useState('20000000');
  const [spend, setSpend] = useState(0);
  const [result, setResult] = useState([]);
  const [currentmoney, setCurrentmoney] = useState();
  const [list, setList] = useState();
  const [time, setTime] = useState("today");
  const [title, setTitle] = useState('내용');

  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
      
    setMoney(money-spend);
    
    
    inputEl.current.focus();
    
  };

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    const List = [...result];
    const Story = '날짜 : ' + time + ' 내용 : '+ title+ ' 비용 : '+ spend;
    if(money!=='20000000')
         setResult([...List, Story]);
         setCurrentmoney(Story);


    return () => { // componentWillUnmount 역할
        
    }
  }, [money]);

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    
    setList (result.map((i) => <li>{i}</li>));
    return () => { // componentWillUnmount 역할
        
    }
  }, [currentmoney]);

  
  return (
    <>
      <div>가계부 2000만원 만들기</div>
      <div>남은 금액 {money}</div>


      <form onSubmit={onSubmitForm}>
      <input
          type="date"
          value={time}
          onChange={(e) => setTime(e.currentTarget.value)}
        />
        <input
         ref={inputEl}

          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <input
          value={spend}
          onChange={(e) => setSpend(e.currentTarget.value)}
        />
        
        <button>감소</button>
      </form>
      <div>{currentmoney}</div>
      --
      <div>{list}</div>
    </>
  );
};



module.exports = Gageboo;


