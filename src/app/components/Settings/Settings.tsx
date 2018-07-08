import * as React from 'react';
import './styles.css';

interface IProps {
    numRows: number;
    numCols: number;
    speed: number;
    onChange: (a: {}) => void,
}

class Settings extends React.Component<IProps, {}> {
    public state = {
        numCols: this.props.numCols,
        numRows: this.props.numRows,
        showForm: false,
        speed: this.props.speed,
    };
    public handleChange = async (event: any) => {
        const value = Math.min(event.target.max, event.target.value);
        await this.setState({[event.target.name]: value});
    };
    public handleBlur = (event: any) => {
        const { onChange } = this.props;
        if (onChange) { onChange({ [event.target.name]: event.target.value }); }
    };
    public handleKey = (event: any) => {
        if (event.keyCode === 13) { this.handleBlur(event) }
    };
    public toggleForm =() => {
        this.setState({showForm: !this.state.showForm});
    };
    public render() {
        const rows = [
            {name: 'numRows', label: 'Rows', max: 40},
            {name: 'numCols', label: 'Cols', max: 40},
            {name: 'speed', label: 'Speed', max: 1000},
        ];
        return (
            <div className="snake-settings">
                <button className={`snake-settings-control ${this.state.showForm && '_show'}`} onClick={this.toggleForm}/>

                <div className={`snake-settings-form ${this.state.showForm && '_show'}`}>
                    {rows.map((value) => (
                        <div className="snake-settings-row" key={`settings-${value.name}`}>
                            <label className="snake-settings-label">{value.label}</label>
                            <input
                                className="snake-settings-input"
                                onChange={this.handleChange}
                                onKeyDown={this.handleKey}
                                name={value.name}
                                type="number"
                                value={this.state[value.name]}
                                max={value.max}
                                onBlur={this.handleBlur} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Settings;