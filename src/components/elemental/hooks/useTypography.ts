import React, {Children} from 'react';

var background = 'background.500';

const useTypography = (children, backgroundColor) => {
  if (backgroundColor) background = backgroundColor;
  //console.log({background, children});
  const applyBackgroundColorToTypography = child => {
    if (child?.type?.name === 'Typography') {
      const cloned = React.cloneElement(child, {
        ...child.props,
        parentBgColor: background,
      });

      return cloned;
    } else if (child?.props && child?.props?.children) {
      const modifiedChildren = useTypography(child.props.children, background);
      return React.cloneElement(child, {
        ...child.props,
        children: modifiedChildren,
      });
    }

    return child;
  };

  return Children.map(children, applyBackgroundColorToTypography);
};

export default useTypography;
