import React from 'react';
import RaisedButton from '../../UI/RaisedButton';
import CodeCard from '../../UI/CodeCard';
import './index.scss';

/**
 * @description
 * Show a single example for the component
 * 
 * @param {string} example optionally including a title before the code
 */
export default class ComponentExample extends React.Component {
    /**
     * Report parent that example should be loaded
     * @param {string} example the code example without title
     */
    loadExample(example) {
        this.props.onChange && this.props.onChange(example);
    }

    /**
     * Render the example
     */
    render () {
        const code = this.props.example.description;
        
        return (
            <div className="library-_-component-example">
                <div className="library-_-code-card-frame">
                    <a className="library-_-try-it-button">
                        <RaisedButton onClick={e => this.loadExample(code)}>
                            Try it!
                        </RaisedButton>
                    </a>
                    <CodeCard>
                        {code}
                    </CodeCard>
                </div>
            </div>
        );
    }
}