<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class TaskGeneratorService
{
    public function generate(int $id=0)
    {
        $leadGenerationTasks = $this->generateLeadGenerationTasks();
        $leadNurturingTasks = $this->generateLeadNurturingTasks();

        //$tasks = array_merge($leadGenerationTasks, $leadNurturingTasks);
        $randomNumbers1 = collect(range(0, 9))->shuffle()->take(5)->toArray();
        $randomNumbers2 = collect(range(0, 8))->shuffle()->take(5)->toArray();
        $workflow = time();
        
        //DB::transactions();
        try {
            for ($i=0;$i<5;$i++) {
                $taskData = $leadGenerationTasks[$randomNumbers1[$i]];
                if($i<2)
                {
                    $taskData['due_date']  = now()->addDays(2);
                    $taskData['is_locked'] = false;
                    $taskData['workflow']  = $workflow;
                }
                $tasks[] = Task::create([...$taskData,...['user_id'=>$id]]);
                
                $taskData = $leadNurturingTasks[$randomNumbers2[$i]];
                $tasks[] = Task::create([...$taskData,...['user_id'=>$id]]);

            } 
        
           // DB::commit();

            return $tasks;
        } catch (throwable $e) {
           // DB::rollback();
        }

        return false;
    }

    private function generateLeadGenerationTasks(): array
    {

        return  [
            [
                'title' => 'Develop Targeted "Cold Outreach" Template',
                'description' => 'Craft compelling email/LinkedIn templates for initial prospect contact.',
                'priority' => 'High',
                'due_date' => '2024-12-22',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Attend an Industry Event (Virtual or In-Person)',
                'description' => 'Network, gain insights, and generate a list of potential leads.',
                'priority' => 'Medium',
                'due_date' => '2024-12-31',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Run Targeted Social Media Ads',
                'description' => 'Leverage ad platforms to reach specific demographics or interests.',
                'priority' => 'Medium',
                'due_date' => '2024-01-10',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Optimize Website for Lead Capture',
                'description' => 'Ensure clear CTAs, landing pages, and forms to capture leads.',
                'priority' => 'High',
                'due_date' => '2024-01-15',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Create Shareable Content (Infographics, Videos)',
                'description' => 'Develop valuable content users will share, expanding reach.',
                'priority' => 'Medium',
                'due_date' => '2024-01-20',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Partner with Influencers in Your Niche',
                'description' => 'Identify relevant influencers to promote your product/service.',
                'priority' => 'Medium',
                'due_date' => '2024-01-25',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Guest Blog on Industry Websites',
                'description' => 'Publish content on relevant websites to gain exposure and backlinks.',
                'priority' => 'Medium',
                'due_date' => '2024-01-30',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Offer Free Consultations or Demos',
                'description' => 'Provide a taste of your solution to convert leads into customers.',
                'priority' => 'High',
                'due_date' => '2024-04-05',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [ 
                'title' => 'Host a Contest or Giveaway',
                'description' => 'Generate excitement and collect leads with a relevant prize.',
                'priority' => 'Medium',
                'due_date' => '2024-04-10',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],
            [
                'title' => 'Leverage LinkedIn Groups', 
                'description' => 'Engage in industry-specific groups for networking and lead generation.',
                'priority' => 'Low',
                'due_date' => '2024-04-15',
                'status' => 'Not Started',
                'category' => 'Lead Generation',
            ],            
        ];
    }

    private function generateLeadNurturingTasks(): array
    {
        return [
            [
                "title" => "Create a High-Value 'Lead Magnet'",
                "description" => "Develop an ebook, whitepaper, or exclusive content piece to offer in exchange for email addresses.",
                "priority" => "High",
                "due_date" => "2024-12-15"
            ],
            [
                "title" => "Map Out an Email Nurturing Flow",
                "description" => "Design a sequence of automated emails educating leads and moving them towards a conversion.",
                "priority" => "Medium",
                "due_date" => "2024-12-31" 
            ],
            [
                'title' => 'Segment Email List',
                'description' => 'Divide subscribers based on interests or behaviors for tailored messaging.',
                'priority' => 'High',
                'due_date' => '2024-12-15',
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
            [
                'title' => 'Create a "Welcome Series" Email Campaign',
                'description' => 'Automate onboarding emails to new subscribers with educational resources.',
                'priority' => 'Medium',
                'due_date' => '2024-12-20',
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
            [
                'title' => 'Provide Free Tools or Resources',
                'description' => 'Offer valuable assets in exchange for contact information.',
                'priority' => 'Medium',
                'due_date' => '2024-04-25', 
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ], 
            [
                'title' => 'Send Personalized Offers or Discounts',
                'description' => 'Incentivize leads based on their past engagement.',
                'priority' => 'Medium',
                'due_date' => '2024-04-20', 
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
            [
                'title' => 'Host a Customer-Only Webinar',
                'description' => 'Provide exclusive content and insights to nurture relationships.',
                'priority' => 'Medium',
                'due_date' => '2024-03-05', 
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
            [
                'title' => 'Conduct Customer Feedback Surveys',
                'description' => 'Gather insights to improve your offerings and nurture leads.',
                'priority' => 'High',
                'due_date' => '2024-03-10', 
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
            [
                'title' => 'Implement a Retargeting Campaign',
                'description' => 'Re-engage website visitors with targeted advertising.',
                'priority' => 'Medium',
                'due_date' => '2024-03-15', 
                'status' => 'Not Started',
                'category' => 'Lead Nurturing',
            ],
        ];
    }
}
