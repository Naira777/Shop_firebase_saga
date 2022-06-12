import React from 'react'
import './styles.scss'

//chikdreni mej linum e html@ poxancac
const Button = ({children, ...otherProps})=> {
return(
<button className="btn" {...otherProps}>
{children}
</button>

)

}

export default Button