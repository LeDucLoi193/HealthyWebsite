export const SuggestLX = () => {
  return (
    <div style={{textAlign: "center"}}>
      <p>L1 toi L4 la vi tri xuong o cot song that lung.</p>
      <h4>Neu chi so {'>'} 100%, ban bi loang xuong</h4>
      <h4>Neu chi so nam trong khoang 40% - 100%, ban bi thieu xuong</h4>
      <h4>Neu chi so {'<'} 40%, chuc mung, ban van khoe</h4> 
      <p>Hay lien he voi bac si de duoc tu van them.</p>
    </div>
  )
}

export const SuggestVP = () => {
  return (
    <div style={{textAlign: "center"}}>
      <p>Day la cac chi so bieu hien cho co quan trong co the.</p>
      <h4>Neu chi so {'>'} 100% hoac {'<'} chi so Min, co the ban dang co benh</h4>
      <h4>Neu thuoc khoang chi so Min - 100%, chuc mung, cac chi so co quan cua ban binh thuong</h4>
      <p>Ban nen di kiem tra mau de kiem tra ky hon.</p>
    </div>
  )
}

export const SuggestVPXN = () => {
  return (
    <div style={{textAlign: "center"}}>
      <p>Day la cac chi so khi xet nghiem mau.</p>
      <h4>Neu chi so WBA, RBC, PLT {'>'} 100% hoac {'<'} chi so Min, ban co nguy co bi viem phoi</h4>
      <p>Hay lien he voi bac si de duoc tu van them.</p>
    </div>
  )
}

export const SuggestGout = (axitUric, minAxitUric) => {
  return (
    <div style={{textAlign: "center"}}>
      <p>Day la mot so chi so khi xet nghiem mau.</p>
      <h4>Neu cac chi so {'>'} 100% hoac {'<'} chi so Min, ban co nguy co bi benh gout</h4>
      {/* {
        axitUric > 100 && axitUric < minAxitUric ? 
        <p>Co the ban da bi gout</p>
        :
        <p>Co the ban van khoe</p>
      } */}
      <p>Hay lien he voi bac si de duoc tu van them</p>
    </div>
  )
}

