import React from 'react'
import { deleteClass } from 'service/class'
import Button from "../../atoms/Button";

const ClassDeleteButton = ({ class_idx }) => {
  const handleButton = async() => {
    if(window.confirm("정말 해당 클래스를 삭제하시겠습니까?")){
      const res = await deleteClass(class_idx)
      if(res != null && res.data.status === 200){
        alert("클래스 삭제에 성공하였습니다.")
      }
    }
    
  }

  return(
    <Button variant="secondary" name="클래스 삭제" onClick={handleButton} />
  )
}

export default ClassDeleteButton