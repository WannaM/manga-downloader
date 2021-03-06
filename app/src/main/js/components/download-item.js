import React from "react";
import classNames from "classnames";

import "../../res/scss/download-item.scss";
import { DownloadStatus } from "../consts/download-status";

const { shell } = require("electron").remote.require("electron");

const DownloadItem = ({ manga, setFilter, setForDelete, retryDownload }) => (
  <div className="download-item">
    <div className="row">
      <div className="cover">
        <img src={manga.info.cover} alt="Cover" />
      </div>
      <div className="col-sm">
        <h5>{manga.info.title}</h5>
        <h6>
          <em>- {manga.info.authors}</em>
        </h6>
        <div className="chapters">
          <small>
            Downloaded <strong>{manga.downloaded.length}</strong> of&nbsp;
            <strong>{manga.chapters.length}</strong> chapters
          </small>
        </div>
        <div className="progress">
          <div
            className={classNames("progress-bar", "progress-bar-striped", {
              "progress-bar-animated": manga.status === DownloadStatus.ONGOING,
              "bg-info": manga.status === DownloadStatus.PAUSED,
              "bg-success": manga.status === DownloadStatus.DOWNLOADED
            })}
            role="progressbar"
            style={{
              width:
                parseInt(
                  (manga.downloaded.length / manga.chapters.length) * 100
                ) + "%"
            }}
          />
        </div>
        <div className="actions mt-3">
          {manga.status == DownloadStatus.DOWNLOADED && (
            <button type="button" className="btn btn-sm btn-success disabled">
              <span className="fa fa-thumbs-up mr-1" />Finished
            </button>
          )}
          {manga.status == DownloadStatus.ONGOING && (
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => {
                setFilter(manga.info.location, DownloadStatus.PAUSED);
              }}>
              <span className="fa fa-pause-circle mr-1" />Pause
            </button>
          )}
          {manga.status == DownloadStatus.PAUSED && (
            <button
              type="button"
              className="btn btn-sm btn-info"
              onClick={() => {
                setFilter(manga.info.location, DownloadStatus.ONGOING);
              }}>
              <span className="fa fa-play-circle mr-1" />Resume
            </button>
          )}
          {manga.status == DownloadStatus.ERROR && (
            <button
              type="button"
              className="btn btn-sm btn-info"
              onClick={() => {
                retryDownload(manga);
              }}>
              <span className="fa fa-play-circle mr-1" />Retry
            </button>
          )}
          <button
            type="button"
            className="btn btn-sm btn-success ml-1"
            onClick={() => {
              shell.showItemInFolder(`${manga.location}/${manga.info.title}`);
            }}>
            <span className="fa fa-folder-open mr-1" />Open folder
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger ml-1"
            onClick={() => {
              setForDelete(manga);
            }}>
            <span className="fa fa-trash mr-1" />Delete
          </button>
        </div>
        {manga.status == DownloadStatus.ERROR && (
          <div className="alert alert-dismissible alert-danger mt-2">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Oh snap!</strong>
            <span>
              There was an error while downloading the manga. Try retrying it,
              if error still persist, contact the dev.
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default DownloadItem;
