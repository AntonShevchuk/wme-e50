export const layerConfig = {
  styleContext: {
    label: (context) => {
      const style = context?.feature?.properties?.style;
      if (!style)
        return style;
      return style?.label;
    },
  },
  styleRules: [
      {
        predicate: (properties) => properties.styleName === "styleNode",
        style: {
          pointRadius: 8,
          fillOpacity: 0.5,
          fillColor: '#fff',
          strokeColor: '#fff',
          strokeWidth: 2,
          strokeLinecap: 'round',
          graphicZIndex: 9999,
        },
      },
      {
        predicate: (properties) => properties.styleName === "styleLine",
        style: {
          strokeWidth: 4,
          strokeColor: '#fff',
          strokeLinecap: 'round',
          strokeDashstyle: 'dash',
          label: "${label}",
          labelOutlineColor: '#000',
          labelOutlineWidth: 3,
          labelAlign: 'cm',
          fontColor: '#fff',
          fontSize: '24px',
          fontFamily: 'Courier New, monospace',
          fontWeight: 'bold',
          labelYOffset: 24,
          graphicZIndex: 9999,
        }
      }
    ],
};
