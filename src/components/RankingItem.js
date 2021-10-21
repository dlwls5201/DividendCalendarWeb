const RankingItem = ({ranking}) => {
  return (
    <tr className={ 'bg-white h-14' }>
      <td>
        <img src={ ranking.logoUrl } width='50px' height='50px' />
      </td>
      <td>{ ranking.companyName }</td>
      <td>{ ranking.symbol }</td>
      <td>{ ranking.count }</td>
      <td>{ ranking.userNumber }</td>
    </tr>
  )
}

export default RankingItem
