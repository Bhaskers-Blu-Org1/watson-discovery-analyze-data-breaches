import React, { PropTypes } from 'react';
import Cloud from './cloud.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line
import NoContent from '../NoContent/index.jsx';

export default React.createClass({
  displayName: 'TopEntities',

  propTypes: {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    entities: PropTypes.object.isRequired,
    query: React.PropTypes.shape({
      hackType: React.PropTypes.string,
      entityTypes: React.PropTypes.array
    }),
    onQueryChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      showQuery: false
    };
  },

  onShowQuery() {
    this.setState({ showQuery: true });
  },

  onShowResults() {
    this.setState({ showQuery: false });
  },

  addFilter(event) {
    event.preventDefault();
    let text = event.target.text;
    let filters = this.props.query.entityTypes || [];
    filters.push(text);
    this.props.onQueryChange({
      entityTypes: filters
    });
  },

  clearFilter(event) {
    event.preventDefault();
    this.props.onQueryChange({
      entityTypes: []
    });
  },

  render() {
    let filterCount = (this.props.query.entityTypes || []).length;
    return (
      <div>
        {!this.state.showQuery ? (
          <div className="top-entities widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">{this.props.title}</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p top-entities--description">
              {this.props.description}
            </p>
            {this.props.entities.results.length > 0 ? (
              <div>
                <Cloud data={this.props.entities.results} handleClick={this.addFilter} />
                {filterCount > 0 ? (
                  <button onClick={this.clearFilter}>Clear filters</button>
                ) : null }
              </div>
            ) : (
              <NoContent
                query={this.props.query}
                message={'No Topics found.'}
              />
            )
            }

          </div>
        ) : (
          <QuerySyntax
            title="Top Entities"
            query={queryBuilder.build(this.props.query, true)}
            response={this.props.entities}
            onGoBack={this.onShowResults}
          />
        )
        }
      </div>
    );
  },
});
