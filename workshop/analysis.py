import numpy as np
from scipy.stats import ttest_ind

# Data from the table
dimensions = ["Engagement", "Novelty", "Challenge", "Exploration", "Enjoyment"]
data = {
    "AC": [4.5, 4.5, 4.5, 5, 5],
    "AN": [4.5, 4, 4, 4, 5],
    "BC": [3, 5, 1, 3.5, 2.5],
    "BN": [5, 4, 4, 5, 4.5],
    "CC": [5, 4.5, 4, 5, 5],
    "CN": [4.5, 4.5, 4.5, 4.5, 5],
    "DC": [4.5, 3.5, 3.5, 5, 4],
    "DN": [5, 4, 4, 5, 5],
    "EC": [5, 5, 5, 5, 5],
    "EN": [5, 5, 5, 5, 5]
}

# Group the true participants (coders: CC, EC and observers: CN, EN)
# Coders (CC, EC)
true_coders = np.array([data["CC"], data["EC"]])
# Observers (CN, EN)
true_observers = np.array([data["CN"], data["EN"]])

# Other participants (non-coders and non-observers)
false_coders = np.array([data["AC"], data["AN"], data["BC"], data["BN"], data["DC"], data["DN"]])
false_observers = np.array([data["AC"], data["AN"], data["BC"], data["BN"], data["DC"], data["DN"]])

# Function to calculate Cohen's d for effect size
def cohens_d(group1, group2):
    mean_diff = np.mean(group1) - np.mean(group2)
    pooled_std = np.sqrt((np.std(group1, ddof=1) ** 2 + np.std(group2, ddof=1) ** 2) / 2)
    return mean_diff / pooled_std if pooled_std != 0 else 0

# Function to analyze a given group (coders or observers)
def analyze_group(true_group, false_group):
    # Calculate mean scores for true and false groups
    true_means = np.mean(true_group, axis=0)
    false_means = np.mean(false_group, axis=0)
    
    # Perform t-tests for each dimension
    p_values = []
    for i in range(len(dimensions)):
        t_stat, p_val = ttest_ind(true_group[:, i], false_group[:, i], equal_var=False)
        p_values.append(p_val)
    
    # Calculate Cohen's d for each dimension
    effect_sizes = [cohens_d(true_group[:, i], false_group[:, i]) for i in range(len(dimensions))]
    
    # Combine results into a summary
    results = {
        "Dimension": dimensions,
        "True Mean": true_means,
        "False Mean": false_means,
        "P-Value": p_values,
        "Effect Size (Cohen's d)": effect_sizes
    }
    return results

# Analyze coders group
coders_results = analyze_group(true_coders, false_coders)
print("Coders Group Analysis:")
print(coders_results)

# Analyze observers group
observers_results = analyze_group(true_observers, false_observers)
print("\nObservers Group Analysis:")
print(observers_results)

import matplotlib.pyplot as plt
import numpy as np

# Data from the Coders and Observers Analysis
dimensions = ['Engagement', 'Novelty', 'Challenge', 'Exploration', 'Enjoyment']
coders_true_mean = [5.00, 4.75, 4.50, 5.00, 5.00]
coders_false_mean = [4.42, 4.17, 3.50, 4.58, 4.33]
observers_true_mean = [4.75, 4.75, 4.75, 4.75, 5.00]
observers_false_mean = [4.42, 4.17, 3.50, 4.58, 4.33]
p_values_coders = [0.1099, 0.1841, 0.2465, 0.1852, 0.1576]
p_values_observers = [0.4395, 0.1841, 0.0724, 0.6766, 0.1576]
cohen_d_coders = [1.12, 1.32, 0.98, 0.89, 0.96]
cohen_d_observers = [0.58, 1.32, 1.35, 0.31, 0.96]

# Plot: Bar Plot for Mean Comparison
fig, ax = plt.subplots(1, 2, figsize=(14, 6))

# Coders vs Observers Mean Comparison
x = np.arange(len(dimensions))
width = 0.35

ax[0].bar(x - width/2, coders_true_mean, width, label='Coders True', color='skyblue')
ax[0].bar(x + width/2, coders_false_mean, width, label='Coders False', color='salmon')
ax[0].set_xticks(x)
ax[0].set_xticklabels(dimensions, rotation=45, ha='right')
ax[0].set_ylabel('Mean Score')
ax[0].set_title('Coders Group Mean Scores')
ax[0].legend()

# Observers Mean Comparison
ax[1].bar(x - width/2, observers_true_mean, width, label='Observers True', color='lightgreen')
ax[1].bar(x + width/2, observers_false_mean, width, label='Observers False', color='lightcoral')
ax[1].set_xticks(x)
ax[1].set_xticklabels(dimensions, rotation=45, ha='right')
ax[1].set_ylabel('Mean Score')
ax[1].set_title('Observers Group Mean Scores')
ax[1].legend()

plt.tight_layout()
plt.show()

# Plot: Effect Size Comparison (Cohen's d)
fig, ax = plt.subplots(figsize=(8, 5))

# Cohen's d for Coders and Observers
ax.bar(x - width/2, cohen_d_coders, width, label='Coders Effect Size', color='skyblue')
ax.bar(x + width/2, cohen_d_observers, width, label='Observers Effect Size', color='lightgreen')
ax.set_xticks(x)
ax.set_xticklabels(dimensions, rotation=45, ha='right')
ax.set_ylabel("Cohen's d")
ax.set_title("Effect Size Comparison (Cohen's d)")
ax.legend()

plt.tight_layout()
plt.show()

# Plot: P-Value Comparison
fig, ax = plt.subplots(figsize=(8, 5))

# P-Value for Coders and Observers
ax.plot(dimensions, p_values_coders, label='Coders P-Value', color='skyblue', marker='o')
ax.plot(dimensions, p_values_observers, label='Observers P-Value', color='lightgreen', marker='o')
ax.axhline(y=0.05, color='red', linestyle='--', label='Significance Threshold (p = 0.05)')
ax.set_xlabel('Dimensions')
ax.set_ylabel('P-Value')
ax.set_title('P-Value Comparison')
ax.legend()

plt.tight_layout()
plt.show()
