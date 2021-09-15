// eslint-disable-next-line import/no-anonymous-default-export
export default function(values) {
    const errors = {};
    const requiredFields = [
      'rating',
      'comment'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
  
    return errors;
  }