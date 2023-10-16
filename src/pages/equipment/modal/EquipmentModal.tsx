import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Modal from "../../../components/modal/Modal";
import {
  EEquipmentModalType,
  IEquipmentDetail,
} from "../../../interfaces/equipment-interface";
import { TRootState } from "../../../stores/reducers";
import "./EquipmentModal.scss";

interface IEquipmentModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onCreateEquipment?: (values: any) => void;
  onUpdateEquipment?: (values: any) => void;
  equipmentModalType?: EEquipmentModalType;
  selectedEquipment?: IEquipmentDetail;
}

const EquipmentModal = ({
  isOpenModal,
  handleCloseModal,
  onCreateEquipment,
  onUpdateEquipment,
  equipmentModalType,
  selectedEquipment,
}: IEquipmentModalProps) => {
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState("");
  const categories = useSelector(
    (state: TRootState) => state.categoryReducer.categories
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name's equipment is require!!"),
    type: Yup.string().required("Type's equipment is require!!"),
    description: Yup.string(),
  });

  const updateValidationSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required("Name's equipment is require!!"),
    type: Yup.string().required("Type's equipment is require!!"),
    description: Yup.string(),
  });

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const handleSubmit = (values: any | any, actions: any) => {
    if (equipmentModalType === EEquipmentModalType.CREATE_EQUIPMENT) {
      onCreateEquipment?.(values as any);
    } else if (equipmentModalType === EEquipmentModalType.UPDATE_EQUIPMENT) {
      onUpdateEquipment?.(values as any);
    }
    setImageName("");
    handleCloseModal();
    actions.resetForm();
  };

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={() => {
        handleCloseModal();
        setImageName("");
      }}
      title={
        equipmentModalType === EEquipmentModalType.CREATE_EQUIPMENT
          ? "Create Equipment Modal"
          : "Update Equipment Modal"
      }
    >
      <div className="EquipmentModal__form">
        <Formik
          initialValues={
            equipmentModalType === EEquipmentModalType.CREATE_EQUIPMENT
              ? {
                  name: "",
                  image: null,
                  type: "",
                  description: "",
                }
              : {
                  id: selectedEquipment?.id,
                  name: selectedEquipment?.name,
                  type: selectedEquipment?.type,
                  image: null,
                  description: selectedEquipment?.description,
                }
          }
          validationSchema={
            equipmentModalType === EEquipmentModalType.CREATE_EQUIPMENT
              ? validationSchema
              : updateValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className="EquipmentModal__form-field-row">
                  <div className="EquipmentModal__form-field">
                    <TextField
                      variant="outlined"
                      label="Equipment Name"
                      size="small"
                      type="text"
                      name="name"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.name}
                      className={`form-control ${
                        formikProps.errors.name &&
                        formikProps.touched.name &&
                        "EquipmentModal__form-error"
                      }`}
                      placeholder="Enter equipment name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="EquipmentModal__form-error-text"
                    />
                  </div>
                  <div className="EquipmentModal__form-field">
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Type"
                      select
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.type}
                      defaultValue=""
                      name="type"
                      className={`form-control ${
                        formikProps.errors.type &&
                        formikProps.touched.type &&
                        "RequestModal__form-error"
                      }`}
                    >
                      {categories.map((category) => (
                        <MenuItem key="1" value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="EquipmentModal__form-error-text"
                    />
                  </div>
                </div>
                <div className="EquipmentModal__form-field-row">
                  <div className="EquipmentModal__form-field">
                    <TextField
                      variant="outlined"
                      label="Description"
                      size="small"
                      type="text"
                      rows={4}
                      multiline
                      name="description"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.description}
                      className={`form-control ${
                        formikProps.errors.description &&
                        formikProps.touched.description &&
                        "EquipmentModal__form-error"
                      }`}
                      placeholder="Enter equipment's description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="EquipmentModal__form-error-text"
                    />
                  </div>
                </div>

                <div className="EquipmentModal__form-field-row">
                  <div className="EquipmentModal__form-field">
                    <div className="EquipmentModal__form-label">Image:</div>
                    <div className="EquipmentModal__form-field-row">
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        href="#file-upload"
                      >
                        Upload a file
                        <VisuallyHiddenInput
                          type="file"
                          name="name"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              formikProps.setFieldValue(
                                "image",
                                e.target.files[0]
                              );
                              setImageName(e.target.files[0].name);
                            }
                          }}
                        />
                      </Button>
                      <div className="EquipmentModal__form-imageName">
                        {imageName ?? "No image chosen"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="EquipmentModal__form-action">
                  {equipmentModalType ===
                  EEquipmentModalType.CREATE_EQUIPMENT ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Create Equipment
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Update Equipment
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default EquipmentModal;
