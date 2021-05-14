
const { max } = require('lodash');
const React = require('react');
const { useState, useEffect } = require('react');



const Gageboo = () => {
    const [money, setMoney] = useState('20000000');
    const [money_show, setMoney_show] = useState('20,000,000');
    const [spend, setSpend] = useState('');
  const [result, setResult] = useState([]);
  const [currentmoney, setCurrentmoney] = useState({});
  const [list, setList] = useState();
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [list_index, setList_index]= useState(0);
  const [premoney, setPremoney] = useState('20000000');
  const inputEl = React.useRef(null);
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    setList_index(list_index+1);
    setPremoney(money);
    setMoney(money-spend);
    
    inputEl.current.focus();
    
  };

  const onListdel = (e) => {
      const mySpend =Number.parseInt(e.spend);
      const myMoney =Number.parseInt(money)+mySpend;

    setResult(result.filter(x => { return x.id != e.id;}));

    setPremoney(money);
    setMoney(myMoney);
  
    
  };
//reduce 공부
  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    //const Story =  time + ' 내역 : '+ title+ ' 금액 : '+ spend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const Story =  {id: list_index,
                    time : time ,
                    title : title,
                    spend : spend //spend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","
                };

    setMoney_show(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    if(premoney>money){
      console.log("감소");

         setResult([...result, Story]);
         setCurrentmoney(Story);
    }else if(premoney<money){
      console.log("증가");
    }

    return () => { // componentWillUnmount 역할
        
    }
  }, [money]);

  useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    
    setList (result.map((i,idx) => <li>{'['+i.time+'] '+i.title+' '+i.spend+ '원'} &nbsp; <button value={idx} onClick={()=>{onListdel(i)}} >내역 삭제</button></li>));//setResult([result.slice(0,i.idx),result.slice(i.idx+1,result.length+1)])
    return () => { // componentWillUnmount 역할
        
    }
  }, [result]);

  
  return (
    <>
      <div>2000만원 저축</div>
      <div>남은 금액 {money_show}원</div>


      <form onSubmit={onSubmitForm}>
      <input
          type="date"
          value={time}
          onChange={(e) => setTime(e.currentTarget.value)}
        />
        &nbsp;
        <input
         ref={inputEl}
          placeholder='내용'
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        &nbsp;
        <input
          placeholder='금액'

          value={spend}
          onChange={(e) => setSpend(e.currentTarget.value)}
        />
        <br/>
        <div><button>절약</button> </div>

        
      </form>
      <div>[사용내역]</div>
      <div>{list}</div>
    </>
  );
};



module.exports = Gageboo;


