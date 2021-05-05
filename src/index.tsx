import React from 'react';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { ReactWidget } from '@jupyterlab/apputils';
import { JSONObject } from '@lumino/coreutils';
import { Widget } from '@lumino/widgets';
import { WorkerComponent } from './WorkerComponent';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'text/plain';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-text_plain';

/**
 * A widget for rendering text_plain.
 */
export class OutputWidget extends ReactWidget {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
  }

  /**
   * Render text_plain into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._mimeType] as JSONObject;
    this.node.textContent = JSON.stringify(data);

    return Promise.resolve();
  }

  render(): JSX.Element {
    return <WorkerComponent />;
  }

  private _mimeType: string;
}

/**
 * A widget for rendering text_plain.
 */
export class OutputWidget2 extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render text_plain into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._mimeType] as JSONObject;
    this.node.textContent = JSON.stringify(data);

    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for text_plain data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: (options) => new OutputWidget(options),
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'myextension:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  fileTypes: [
    {
      name: 'text_plain',
      mimeTypes: [MIME_TYPE],
      extensions: ['.ipynb'],
    },
  ],
  documentWidgetFactoryOptions: {
    name: 'My Viewer',
    primaryFileType: 'text_plain',
    fileTypes: ['text_plain'],
    defaultFor: ['text_plain'],
  },
};

console.log('Cookiecutter extension loaded!');
export default extension;
