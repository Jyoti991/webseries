import { html, css, LitElement } from 'lit';

class WebSeriesForm extends LitElement {
  static get styles() {
    // ... Your styles here ...
    return css`
      form {
        padding: 32px;
        display: grid;
        font-size: 18px;
        grid-template-columns: 1fr 1fr;
      }

      .series-info label {
        color: #444;
        font-size: 18px;
        /* padding: 8px; */
        margin: 8px;
      }

      .series-info select,
      input {
        font-size: 32px;
        padding: 12px;
        border: 2px solid #8a2be2;
        border-radius: 10px;
        margin: 8px;
      }

      #streaming-on {
        font-size: 32px;
        padding: 12px;
        border: 2px solid #8a2be2;
        border-radius: 10px;
        margin: 8px;
      }

      .btn {
        width: 100%;
        height: 74px;
        font-size: 32px;
        font-weight: 600px;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: center;
        border: none;
        color: #f0f8ff;
        background-color: #8a2be2;
        border-radius: 25px;
        cursor: pointer;
        margin: 32px 0 0 18px;
      }

      .btn:hover {
        color: #8a2be2;
        background-color: #f0f8ff;
        border: 2px solid #8a2be2;
      }
    `;
  }

  static get properties() {
    return {
      // eslint-disable-next-line lit/no-native-attributes
      title: { type: String },
      director: { type: String },
      star: { type: String }, // Change type to String, as it seems you're storing stars as a string
      platform: { type: String },
    };
  }

  constructor() {
    super();
    this.title = '';
    this.director = '';
    this.star = '';
    this.platform = 'Choose one'; // Default value for the select field
  }

  handleAddButtonClick(e) {
    e.preventDefault();
    // Create a new web series object with the form values
    const newSeries = {
      title: this.title,
      directors: this.director,
      stars: this.star,
      platform: this.platform,
    };

    console.log('Add button clicked. Data:', newSeries);

    // Dispatch a custom event with the new web series data
    const seriesAdded = new CustomEvent('web-series-added', {
      detail: newSeries, // Pass the new series data as detail
      bubbles: true, // Allow the event to bubble up the DOM tree
      composed: true, // Allow the event to cross the shadow DOM boundary
    }); // (2)
    this.dispatchEvent(seriesAdded);
    // this.dispatchEvent(
    //   new CustomEvent('web-series-added', {
    //     detail: newSeries, // Pass the new series data as detail
    //     bubbles: true, // Allow the event to bubble up the DOM tree
    //     composed: true, // Allow the event to cross the shadow DOM boundary
    //   })
    // );

    // Clear the form fields after adding
    this.title = '';
    this.director = '';
    this.star = '';
    this.platform = 'Choose one';
  }

  // // Function to handle the "Add" button click event
  // handleAddButtonClick() {
  //   // Create a new web series object with the form values
  //   const newSeries = {
  //     title: this.title,
  //     director: this.director,
  //     star: this.star,
  //     platform: this.platform,
  //   };

  //   // Dispatch a custom event with the new web series data
  //   this.dispatchEvent(
  //     new CustomEvent('web-series-added', {
  //       detail: newSeries, // Pass the new series data as detail
  //       bubbles: true, // Allow the event to bubble up the DOM tree
  //       composed: true, // Allow the event to cross the shadow DOM boundary
  //     })
  //   );

  //   // Clear the form fields after adding
  //   this.title = '';
  //   this.director = '';
  //   this.star = '';
  //   this.platform = 'Choose one';
  // }

  render() {
    return html`
      <form id="infos">
        <label for="title">Title:</label>
        <input
          id="title"
          type="text"
          .value="${this.title}"
          @input="${e => {
            this.title = e.target.value;
          }}"
        />
        <label for="director">Director:</label>
        <input
          id="director"
          type="text"
          .value="${this.director}"
          @input="${e => {
            this.director = e.target.value;
          }}"
        />
        <label for="stars">Stars:</label>
        <input
          id="stars"
          type="text"
          .value="${this.star}"
          @input="${e => {
            this.star = e.target.value;
          }}"
        />
        <label for="streaming-on">Streaming On:</label>
        <select
          id="streaming-on"
          .value="${this.platform}"
          @change="${e => {
            this.platform = e.target.value;
          }}"
        >
          <option>Choose one</option>
          <option value="hotstar">Hotstar</option>
          <option value="jio-cinema">Jio Cinema</option>
          <option value="netflix">Netflix</option>
          <option value="mx-player">MX Player</option>
          <option value="prime-video">Prime Video</option>
          <option value="sony-liv">Sony Liv</option>
        </select>
        <button
          id="addButton"
          class="btn"
          @click="${e => this.handleAddButtonClick(e)}"
        >
          Add
        </button>
      </form>
    `;
  }
}

customElements.define('web-series-form', WebSeriesForm);
