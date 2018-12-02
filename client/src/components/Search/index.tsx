import React, { Component, FormEvent, MouseEventHandler } from 'react'
import { compose } from 'recompose'
import { hot } from 'react-hot-loader'
import injectStyles, { JSSProps } from 'react-jss'
import Autosuggest, {
  ChangeEvent,
  SuggestionsFetchRequested,
  OnSuggestionsClearRequested,
  OnSuggestionSelected,
  GetSuggestionValue,
  RenderSuggestion,
  RenderInputComponent
} from 'react-autosuggest'

import styles from './styles'

export interface OuterProps {
  suggestions: Array<any>
  value: string
  onFetchRequest: SuggestionsFetchRequested
  onChange: (event: FormEvent<HTMLInputElement>, suggestionEvent: ChangeEvent) => void
  onSelected: OnSuggestionSelected<any>
  onClear: () => void
}
export interface Props extends OuterProps, JSSProps<typeof styles> {}
interface State {}

class SearchBar extends Component<Props, State> {
  onSearchChange = (event: FormEvent<HTMLInputElement>, suggestionEvent: ChangeEvent) => {
    this.props.onChange(event, suggestionEvent)
  }

  onSuggestionsFetchRequested: SuggestionsFetchRequested = options => {
    this.props.onFetchRequest(options)
  }

  onSuggestionsClearRequested: OnSuggestionsClearRequested = () => this.props.onClear()

  onSuggestionSelected: OnSuggestionSelected<any> = (event, suggestion) =>
    this.props.onSelected(event, suggestion)

  getSuggestionValue: GetSuggestionValue<any> = suggestion => suggestion.name

  renderSuggestion: RenderSuggestion<any> = suggestion => (
    <div className={this.props.classes.suggestion}>{suggestion.name}</div>
  )

  renderInput: RenderInputComponent<any> = inputProps => {
    const { classes } = this.props

    return (
      <div className={classes.inputWrapper}>
        <input {...inputProps} />
      </div>
    )
  }

  render() {
    const { classes, suggestions, value } = this.props

    return (
      <Autosuggest
        suggestions={suggestions}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        renderInputComponent={this.renderInput}
        inputProps={{
          placeholder: 'Поиск',
          onChange: this.onSearchChange,
          value
        }}
        theme={{
          container: classes.container,
          containerOpen: classes.containerOpen,
          input: classes.input,
          inputOpen: classes.inputOpen,
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList
        }}
      />
    )
  }
}

export default injectStyles<OuterProps>(styles)(SearchBar)
