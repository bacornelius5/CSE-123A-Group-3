import { useContext, useEffect, useRef, useState } from 'react'
import { MenubarContext } from './Menubar'
import { SubmenuContext } from './Submenu'
import PropTypes from "prop-types"


function MenuItem ( { children, ...props } ) {
  const menubarContext = useContext( MenubarContext )
  const submenuContext = useContext(SubmenuContext)
  if ( !menubarContext && !submenuContext ) {
    throw new Error("MenuItem must be used within a Menubar or Submenu Context")
  }

  const [ isFirstChild, setIsFirstChild ] = useState( false )
  const { menuItems } = menubarContext
  const menuItemRef = useRef()

  const listItemProps = {
    ...props,
    "data-menubar-listitem": "",
    role: "none",
    ref: menuItemRef
  }

  const childProps = {
    "data-menubar-menuitem": "",
    role: "menuitem",
    tabIndex: !submenuContext && isFirstChild ? "0" : "-1",
  }

  useEffect( () => {
    const menuItemNode = menuItemRef.current

    if ( menuItemNode ) {
      if ( !menuItems.size ) {
        setIsFirstChild(true)
      }
      menuItems.add(menuItemNode)
    }

    return () => {
      menuItems.delete(menuItemNode)
    }
  }, [menuItems])

  return (
    <li {...listItemProps}>
      {typeof children === "function" 
        ? children( childProps )
        : React.cloneElement( children, childProps )
      }
    </li>
  )
}

MenuItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
}

export default MenuItem