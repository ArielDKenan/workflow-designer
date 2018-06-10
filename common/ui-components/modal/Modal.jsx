import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Modal as BaseModal } from 'sdc-ui/lib/react';
import { actionTypes } from './ModalConstants.js';

const mapStateToProps = ({ modal }) => {
    return modal;
};

function mapDispatchToProps(dispatch) {
    return {
        close: () => {
            dispatch({
                type: actionTypes.HIDE_MODAL
            });
        }
    };
}

const ActionButtonFooter = ({
    close,
    actionButtonText,
    closeButtonText,
    actionButtonClick
}) => {
    return (
        <BaseModal.Footer
            onClose={close}
            actionButtonText={actionButtonText}
            actionButtonClick={() => {
                actionButtonClick();
                close();
            }}
            closeButtonText={closeButtonText}
            withButtons
        />
    );
};

const NoActionButtonFooter = ({ close, closeButtonText }) => {
    return (
        <BaseModal.Footer
            onClose={close}
            closeButtonText={closeButtonText}
            withButtons
        />
    );
};

class Modal extends React.Component {
    render() {
        let actionButtonText = I18n.t('modal.default.actionButton');
        let closeButtonText = I18n.t('modal.default.closeButton');
        let {
            close,
            actionButtonClick,
            show = false,
            type = 'info',
            size = 'small',
            title,
            body,
            BodyComponent,
            BodyProps
        } = this.props;
        let footer = null;
        if (actionButtonClick !== undefined) {
            footer = (
                <ActionButtonFooter
                    close={close}
                    closeButtonText={closeButtonText}
                    actionButtonText={actionButtonText}
                    actionButtonClick={actionButtonClick}
                />
            );
        } else {
            footer = (
                <NoActionButtonFooter
                    close={close}
                    closeButtonText={closeButtonText}
                />
            );
        }
        return (
            <BaseModal show={show} type={type} size={size}>
                <BaseModal.Header type={type} onClose={this.props.close}>
                    <BaseModal.Title>{title}</BaseModal.Title>
                </BaseModal.Header>
                <BaseModal.Body>
                    {BodyComponent ? <BodyComponent {...BodyProps} /> : body}
                </BaseModal.Body>
                {footer}
            </BaseModal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
