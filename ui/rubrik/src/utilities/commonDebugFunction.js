import { useRef, useEffect } from "react";

// Hook
export function useTraceUpdate(props, comp) {
    
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                console.log('change in props');
            
                console.log(prev.current[k], v);
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log(" :",  comp);
            console.log("Changed props:", changedProps);
        }
        prev.current = props;
    });
}

// Class
export function stateComponentTraceUpdate(self, prevProps, prevState) {
    Object.entries(self.props).forEach(
        ([key, val]) =>
            prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (self.state) {
        Object.entries(self.state).forEach(
            ([key, val]) =>
                prevState[key] !== val && console.log(`State '${key}' changed`)
        );
    }
}
