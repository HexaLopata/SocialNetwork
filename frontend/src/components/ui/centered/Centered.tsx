import React, { FC } from 'react'
import { Props } from '../../../types/Props'
import classes from './Centered.module.css'

export const Centered: FC<Props> = ({ children }) => {
  return (
    <div className={classes.centered}>
        {children}
    </div>
  )
}
