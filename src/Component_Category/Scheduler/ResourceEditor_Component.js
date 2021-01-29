import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'clsx';
import {getAppointmentColor} from "./Based_On/utils";
import Scheduler_Context from "../../Context/Context_Info/Scheduler_Context";
import {Vacation_Type,NotCheck_Type,ExtraWork_Type} from "./Test_Data/Data";
import cloneDeep from "lodash/cloneDeep";

const getResourceInstance = (resourceInstances, id) => resourceInstances
    .find(item => item.id === id);

const useStyles = makeStyles(({spacing}) => ({
    select: {
        padding: spacing(1),
    },
    selectBox: {
        minHeight: spacing(6.5),
        width: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        color: 'white',
        margin: 2,
    },
    resourceCircle: {
        height: spacing(2),
        width: spacing(2),
        borderRadius: '50%',
        marginRight: spacing(1),
    },
    itemContainer: {
        display: 'flex',
        padding: spacing(0.75),
    },
    circleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));


const Vacation_Resources  =   {
    fieldName: 'subtype',
    title: '请假',
    instances: Vacation_Type,
    allowMultiple: false,
}

const NotCheck_Resources  =   {
    fieldName: 'subtype2',
    title: '未打卡',
    instances: NotCheck_Type,
    allowMultiple: false,
}

const ExtraWork_Resources  =   {
    fieldName: 'subtype3',
    title: '加班',
    instances: ExtraWork_Type,
    allowMultiple: false,
}


const ResourceEditor = React.memo(({
                                       readOnly,
                                       resource,
                                       appointmentResources,
                                       onResourceChange,
                                       className,
                                       ...restProps
                                   }) => {
    const classes = useStyles();
    const Scheduler_Data = useContext(Scheduler_Context);
    const {data, loading, sending, setSending, setData} = Scheduler_Data

    const values = appointmentResources.reduce((acc, resourceItem) => (
            resourceItem.fieldName === resource.fieldName
                ? [...acc, resourceItem.id]
                : acc),
        []);

    const onChange = (nextValue) => {

        console.log({[resource.fieldName]: nextValue})
        setData((preData)=>{
            let copy_data = cloneDeep(preData);
            console.log(nextValue)
            if (resource.fieldName==='type'){
                console.log('进入if')
                if (nextValue ===1){
                    copy_data.resources[1] =NotCheck_Resources
                }
                if (nextValue ===2){
                    copy_data.resources[1] =Vacation_Resources
                }
                if (nextValue ===3){
                    copy_data.resources[1] =ExtraWork_Resources
                }
            }

            return copy_data
        })
        onResourceChange({[resource.fieldName]: nextValue});
    };

    return (
        <Select
            disabled={readOnly}
            variant="outlined"
            value={function () {
                return values
            }()}
            multiple={resource.allowMultiple}
            onChange={event => onChange(event.target.value)}
            className={classNames(classes.selectBox, className)}
            classes={{select: classes.select}}
            renderValue={selected => (
                resource.allowMultiple ? (
                    <div className={classes.chips}>
                        {selected.map((value) => {
                            const resourceItem = getResourceInstance(resource.instances, value);
                            return (
                                <Chip
                                    key={value}
                                    label={resourceItem.text}
                                    className={classes.chip}
                                    style={{backgroundColor: getAppointmentColor(300, resourceItem.color)}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className={classes.itemContainer}>
                        <div className={classes.circleContainer}>
                            <div
                                className={classes.resourceCircle}
                                style={{
                                    backgroundColor: getAppointmentColor(
                                        400, getResourceInstance(resource.instances, selected[0]).color,
                                    ),
                                }}
                            />
                        </div>
                        {getResourceInstance(resource.instances, selected[0]).text}
                    </div>
                )
            )}
            {...restProps}
        >
            {resource.instances.map(resourceItem => (
                <MenuItem key={resourceItem.id} value={resourceItem.id}>
                    <div
                        className={classes.resourceCircle}
                        style={{backgroundColor: getAppointmentColor(400, resourceItem.color)}}
                    />
                    {resourceItem.text}
                </MenuItem>
            ))}
        </Select>
    );
});

ResourceEditor.propTypes = {
    readOnly: PropTypes.bool,
    appointmentResources: PropTypes.array,
    onResourceChange: PropTypes.func,
    resource: PropTypes.object,
    className: PropTypes.string,
};

ResourceEditor.defaultProps = {
    className: undefined,
    readOnly: false,
    appointmentResources: [],
    onResourceChange: () => undefined,
    resource: {},
};


export default ResourceEditor
