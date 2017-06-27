import React from 'react';
import { connect } from 'react-redux';
import './SettingsPage.css';
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import * as actions from '../../../../store/ducks/schema';

const LinkMenuItem = ({ path, name }) =>
  <li key={path}>
    <Link to={`/settings/${path}`}>
      {name}
    </Link>
  </li>;

export default compose(
  connect(state => ({}), { ...actions }),
  lifecycle({
    componentWillMount() {
      this.props.loadSchema();
    },
  }),
  connect(state => ({ schema: state.schema })),
)((props) => {
  const { schema, children } = props;
  return (
    <div className="schema-page-container">
      <ul className="side-menu" key="SideMenu">
        <li>
          <div>Identities</div>
          <ul>
            {Object.keys(schema).map(x => ({ path: `identities/${x}`, name: x })).map(LinkMenuItem)}
          </ul>
        </li>
      </ul>
      <div style={{ display: 'flex', flexGrow: 1 }} key="Page">
        {children}
      </div>
    </div>
  );
});
