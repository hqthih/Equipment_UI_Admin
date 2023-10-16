import React from "react";
import Modal from "../../../components/modal/Modal";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import "./CategoryModal.scss";
import { ICategory } from "../../../interfaces/category-interface";

interface ICategoryModalProps {
  isOpenModal: boolean;
  isUpdateModal?: boolean;
  categoryData?: ICategory;
  onCloseModal: () => void;
  onUpdateCategory?: (values: { name: string }) => void;
  onCreateCategory?: (values: { name: string }) => void;
}

const CategoryModal = ({
  isOpenModal,
  isUpdateModal,
  onCloseModal,
  categoryData,
  onCreateCategory,
  onUpdateCategory,
}: ICategoryModalProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name's category is require!!"),
  });

  const handleSubmit = (values: { name: string }) => {
    if (isUpdateModal) {
      onUpdateCategory?.(values);
    } else {
      onCreateCategory?.(values);
    }
    onCloseModal();
  };

  return (
    <Modal
      open={isOpenModal}
      title={isUpdateModal ? "Update Category Modal" : "Create Category Modal"}
      handleCloseModal={onCloseModal}
    >
      <div className="CategoryModal__form">
        <Formik
          initialValues={
            isUpdateModal ? { name: categoryData?.name || "" } : { name: "" }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className="CategoryModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Category Name"
                    size="small"
                    type="text"
                    name="name"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.name}
                    className={`form-control ${
                      formikProps.errors.name &&
                      formikProps.touched.name &&
                      "CategoryModal__form-error"
                    }`}
                    placeholder="Enter equipment name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="CategoryModal__form-error-text"
                  />
                </div>
                <div className="CategoryModal__form-action">
                  {isUpdateModal ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Create Category
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Create Category
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

export default CategoryModal;
