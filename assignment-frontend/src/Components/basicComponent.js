import React from 'react'
import { styles } from './generalStyle'
import { Typography } from 'antd'

const { Text } = Typography

export function lebleRedStar(title, isRequired) {
  return <div> {labelHeader(title, isRequired)} </div>
}

function redStar() {
  return <Text style={{ ...styles.normalText, ...styles.validateStar }}>*</Text>
}

function labelHeader(title, isRequired) {
  if (isRequired) {
    return <div><Text style={{ ...styles.normalText }} > {title} {redStar()}</Text> </div>
  } else {
    return <Text style={{ ...styles.normalText}}> {title} </Text>
  }
}