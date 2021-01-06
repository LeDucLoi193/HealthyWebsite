export const SuggestLX = () => {
  return (
    <div style={{textAlign: ""}}>
      <h3>Giải thích</h3>
      <h4>Nếu chỉ số {'>'} 100%, bạn bị loãng xương</h4>
      <h4>Nếu chỉ số nằm trong khoảng 40% - 100%, bạn bị thiếu xương</h4>
      <h4>Nếu chỉ số  {'<'} 40%, bạn vẫn bình thường</h4> 
      <p>Hãy liên hệ bác sĩ để đước tư vấn thêm</p>
    </div>
  )
}

// export const SuggestVP = () => {
//   return (
//     <div style={{textAlign: ""}}>
//       <h3>Giải thích</h3>
//       <p>Day la cac chi so bieu hien cho co quan trong co the.</p>
//       <h4>Neu chi so {'>'} 100% hoac {'<'} chi so Min, co the ban dang co benh</h4>
//       <h4>Neu thuoc khoang chi so Min - 100%, chuc mung, cac chi so co quan cua ban binh thuong</h4>
//       <p>Hãy liên hệ bác sĩ để được tư vấn chi tiết hơn</p>
//     </div>
//   )
// }

export const SuggestVPXN = () => {
  return (
    <div style={{textAlign: ""}}>
      <p>Đây là các chỉ số khi xét nghiệm máu.</p>
      <h4>Các chỉ số WBA, RBC, PLT đo lượng bạch cầu, tiểu cầu trong máu, chuẩn đóan nguy cơ bị viêm phổi</h4>
      <h4>Neu chỉ số {'>'} 100% hoặc {'<'} chỉ số Min, các chỉ số đang không bình thường</h4>
      <p>Hãy liên hệ bác sĩ để được tư vấn chi tiết hơn</p>
    </div>
  )
}

export const SuggestGout = (axitUric, minAxitUric) => {
  return (
    <div style={{textAlign: ""}}>
      <h3>Giải thích</h3>
      <p>Đây là một số chỉ số khi xét nghiệm máu</p>
      <h4>Nếu chỉ số axit uric{'>'} 100%, bạn có nguy cơ mắc bệnh gout</h4>
      {/* {
        axitUric > 100 && axitUric < minAxitUric ? 
        <p>Co the ban da bi gout</p>
        :
        <p>Co the ban van khoe</p>
      } */}
      <p>Hãy liên hệ bác sĩ để được tư vấn chi tiết hơn</p>
    </div>
  )
}

