import classes from './StackPanel.module.css'

function StackPanel({children, direction, ...props}) {
    let className = classes.stackpanel + ' ' + classes.column
    if (direction && direction === 'row') {
        className = classes.stackpanel + ' ' + classes.row
    }

    return ( 
        <div {...props} className={className}>
            {children}
        </div>
    );
}

export default StackPanel;