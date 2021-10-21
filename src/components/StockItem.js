const StockItem = ({stock}) => {

  return (
    <tr className={ 'bg-white h-14' }>
      <td>
        <img src={ stock.logoUrl } width='50px' height='50px' />
      </td>
      <td>{ stock.companyName }</td>
      <td>{ stock.symbol }</td>
      <td>{ stock.count }</td>
    </tr>
  )
}

export default StockItem