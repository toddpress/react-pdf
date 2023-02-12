import PropTypes from 'prop-types';
import { mouseEvents, touchEvents, keyboardEvents } from 'make-event-props';

import LinkService from '../LinkService';

const eventPropNames = [...mouseEvents, ...touchEvents, ...keyboardEvents] as const;

type AllEventPropNames = typeof eventPropNames[number];

type EventProps = Record<string, unknown> & {
  [K in AllEventPropNames]?: any;
};

export const eventProps = (() => {
  const result: EventProps = {};

  eventPropNames.forEach((eventName) => {
    result[eventName] = PropTypes.func;
  });

  return result;
})();

const fileTypes = [
  PropTypes.string,
  PropTypes.instanceOf(ArrayBuffer),
  PropTypes.shape({
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    httpHeaders: PropTypes.object,
    range: PropTypes.object,
    url: PropTypes.string,
    withCredentials: PropTypes.bool,
  }),
];
if (typeof File !== 'undefined') {
  fileTypes.push(PropTypes.instanceOf(File));
}
if (typeof Blob !== 'undefined') {
  fileTypes.push(PropTypes.instanceOf(Blob));
}

export const isClassName = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

export const isFile = PropTypes.oneOfType(fileTypes);

export const isLinkService = PropTypes.instanceOf(LinkService);

export const isLinkTarget = PropTypes.oneOf(['_self', '_blank', '_parent', '_top']);

export const isPage = PropTypes.shape({
  commonObjs: PropTypes.shape({}).isRequired,
  getAnnotations: PropTypes.func.isRequired,
  getTextContent: PropTypes.func.isRequired,
  getViewport: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
});

export function isPageIndex(
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
) {
  const { [propName]: pageIndex, pageNumber, pdf } = props;

  if (typeof pdf !== 'object' || pdf === null) {
    return null;
  }

  if (typeof pageIndex !== 'undefined') {
    if (typeof pageIndex !== 'number') {
      return new Error(
        `\`${propName}\` of type \`${typeof pageIndex}\` supplied to \`${componentName}\`, expected \`number\`.`,
      );
    }

    if (pageIndex < 0) {
      return new Error(`Expected \`${propName}\` to be greater or equal to 0.`);
    }

    if (!('numPages' in pdf)) {
      return null;
    }

    const { numPages = 0 } = pdf;

    if (pageIndex + 1 > Number(numPages)) {
      return new Error(`Expected \`${propName}\` to be less or equal to ${Number(numPages) - 1}.`);
    }
  } else if (typeof pageNumber === 'undefined') {
    return new Error(
      `\`${propName}\` not supplied. Either pageIndex or pageNumber must be supplied to \`${componentName}\`.`,
    );
  }

  // Everything is fine
  return null;
}

export function isPageNumber(
  props: Record<string, unknown>,
  propName: string,
  componentName: string,
) {
  const { [propName]: pageNumber, pageIndex, pdf } = props;

  if (typeof pdf !== 'object' || pdf === null) {
    return null;
  }

  if (typeof pageNumber !== 'undefined') {
    if (typeof pageNumber !== 'number') {
      return new Error(
        `\`${propName}\` of type \`${typeof pageNumber}\` supplied to \`${componentName}\`, expected \`number\`.`,
      );
    }

    if (pageNumber < 1) {
      return new Error(`Expected \`${propName}\` to be greater or equal to 1.`);
    }

    if (!('numPages' in pdf)) {
      return null;
    }

    const { numPages = 0 } = pdf;

    if (pageNumber > Number(numPages)) {
      return new Error(`Expected \`${propName}\` to be less or equal to ${numPages}.`);
    }
  } else if (typeof pageIndex === 'undefined') {
    return new Error(
      `\`${propName}\` not supplied. Either pageIndex or pageNumber must be supplied to \`${componentName}\`.`,
    );
  }

  // Everything is fine
  return null;
}

export const isPdf = PropTypes.oneOfType([
  PropTypes.shape({
    getDestination: PropTypes.func.isRequired,
    getOutline: PropTypes.func.isRequired,
    getPage: PropTypes.func.isRequired,
    numPages: PropTypes.number.isRequired,
  }),
  PropTypes.bool,
]);

export const isRef = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.any,
  }),
]);

export const isRenderMode = PropTypes.oneOf(['canvas', 'none', 'svg']);

export const isRotate = PropTypes.oneOf([0, 90, 180, 270]);
