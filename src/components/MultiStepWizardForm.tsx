import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  rfpTitle: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  client: z.string({ required_error: 'Please select a client.' }),
  dueDate: z.date({ required_error: 'A due date is required.' }),
  proposalValue: z.coerce.number().min(1, { message: 'Value must be a positive number.' }),
  requirements: z.string().min(10, { message: 'Requirements must be at least 10 characters long.' }),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'Step 1', name: 'Basic Information', fields: ['rfpTitle', 'client', 'dueDate'] as const },
  { id: 'Step 2', name: 'Value & Requirements', fields: ['proposalValue', 'requirements'] as const },
  { id: 'Step 3', name: 'Review & Submit', fields: [] as const },
];

const MultiStepWizardForm: React.FC = () => {
  console.log('MultiStepWizardForm loaded');
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rfpTitle: '',
      requirements: '',
    },
  });

  const processForm = (data: FormData) => {
    console.log('RFP Creation Data:', data);
    toast.success('RFP Created Successfully!', {
      description: `The RFP "${data.rfpTitle}" has been added to the pipeline.`,
    });
    // Here you would typically call a mutation to save the data
    // and potentially redirect the user or close a dialog.
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressValue = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>{steps[currentStep].name}</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length} - Please fill out the form.
        </CardDescription>
        <Progress value={progressValue} className="w-full mt-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          <CardContent className="min-h-[280px]">
            {currentStep === 0 && (
              <div className="space-y-4">
                <FormField control={form.control} name="rfpTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>RFP Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Q3 Enterprise Software Overhaul" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="client" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="acme-inc">Acme Inc.</SelectItem>
                        <SelectItem value="stark-industries">Stark Industries</SelectItem>
                        <SelectItem value="wayne-enterprises">Wayne Enterprises</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="dueDate" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4">
                 <FormField control={form.control} name="proposalValue" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposal Value ($)</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="requirements" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Requirements</FormLabel>
                    <FormControl><Textarea placeholder="Summarize the key requirements of the RFP..." className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center mb-4">Review Your RFP Details</h3>
                <div className="space-y-2 rounded-lg border p-4">
                    <div className="flex justify-between"><span className="text-muted-foreground">Title:</span> <span className="font-medium text-right">{form.getValues('rfpTitle')}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Client:</span> <span className="font-medium text-right">{form.getValues('client')}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Due Date:</span> <span className="font-medium text-right">{format(form.getValues('dueDate'), "PPP")}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Value:</span> <span className="font-medium text-right">${form.getValues('proposalValue').toLocaleString()}</span></div>
                    <p className="text-sm text-muted-foreground pt-2">Requirements:</p>
                    <p className="text-sm rounded-md bg-muted p-2">{form.getValues('requirements')}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button type="button" onClick={handlePrev} disabled={currentStep === 0} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Create RFP
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default MultiStepWizardForm;