<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
//        if (!auth()->check()) {
//            return false;
//        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'due_date' => ['required', 'date'],
            'priority' => ['sometimes', 'required', Rule::in(['low', 'medium', 'high'])],
            'status' => ['sometimes', 'required', Rule::in(['pending', 'in_progress', 'completed'])],
        ];
    }


    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @throws ValidationException
     */
    public function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'errors' => $validator->errors(),
        ], 422);

        throw new ValidationException($validator, $response);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'description.required' => 'Description is required',
            'due_date.required' => 'Due date is required',
            'due_date.date' => 'Due date must be a valid date',
            'priority.in' => 'Priority must be low, medium or high',
            'status.in' => 'Status must be pending, in_progress or completed',
        ];
    }

    /**
     * Prepare the data for validation.
     * Change dueDate to due_date or any other name that matches the column name in the database
     */
//    public function prepareForValidation(): void
//    {
//        $this->merge([
//            'dueDate' => $this->dueDate,
//        ]);
//    }
}
