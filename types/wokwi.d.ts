// Type declarations for wokwi-elements custom web components
declare namespace JSX {
    interface IntrinsicElements {
        'wokwi-led': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { color?: string }, HTMLElement>;
        'wokwi-potentiometer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { value?: string }, HTMLElement>;
        'wokwi-tmp36': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { temperature?: string }, HTMLElement>;
        'wokwi-servo': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { angle?: string }, HTMLElement>;
        'wokwi-photoresistor-sensor': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}

export { };
