import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { shape, bool, func, number, string, oneOfType } from "prop-types";

export const AccordionRow = ({ content, active, onClick, index }) => {
  const date = new Date(content.publish_date * 1000);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedTime = `${day}.${month}.${year}`;
  const handleClick = () => onClick(index);

  return (
    <>
      <ListItem button onClick={handleClick} selected={active}>
        <ListItemText primary={content.company_name} />
      </ListItem>
      <Divider />
      <div>
        <ReactCSSTransitionGroup
          transitionName="content"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {active && (
            <div className="content">
              <p>Title: {content.title}</p>
              <p>Publish Date: {formattedTime}</p>
              <p>Contact Name: {content.contact_name}</p>
              <p>Company Name: {content.company_name}</p>
              <p>Location City: {content.location_city}</p>
              <p>comments: {content.comments}</p>
              <p>Description: {content.description}</p>
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    </>
  );
};

AccordionRow.propTypes = {
  content: shape({
    id: string,
    company_name: string,
    comments: oneOfType([number, string]),
    publish_date: string,
    contact_name: string,
    title: string,
    location_city: string,
    description: string
  }),
  active: bool,
  onClick: func,
  index: number
};

AccordionRow.defaultProps = {
  content: {
    id: "0",
    company_name: "",
    comments: 0,
    publish_date: "",
    contact_name: "",
    title: "",
    location_city: "",
    description: ""
  },
  active: false,
  onClick: () => {},
  index: -1
};
